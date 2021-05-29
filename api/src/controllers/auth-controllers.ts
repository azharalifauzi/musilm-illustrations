import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user-model';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(400).send({ message: 'User not found' });

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) return res.status(401).send({ message: 'Wrong credentials' });

  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );

  // Store it on session object
  req.session = {
    jwt: userJwt,
  };

  res.status(200).send(user);
};

const logout = async (req: Request, res: Response) => {
  req.session = null;

  res.send({});
};

export { login, logout };
