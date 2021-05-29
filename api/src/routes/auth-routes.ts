import express from 'express';
import { body } from 'express-validator';
import { login, logout } from '../controllers/auth-controllers';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router
  .route('/login')
  .post(
    [
      body('username').notEmpty().withMessage('Username required'),
      body('password').notEmpty().withMessage('Password required'),
    ],
    validateRequest,
    login
  );

router.route('/logout').post(logout);

export default router;
