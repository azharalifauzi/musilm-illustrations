import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  username: string;
  createdAt?: Date;
  password: string;
}

export interface IUserDoc extends IUser, Document {}

interface IUserModel extends Model<IUserDoc> {
  build(attrs: IUser): IUserDoc;
}

const UserSchemaFields: Record<keyof IUser, any> = {
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  password: {
    type: String,
    required: true,
  },
};

const UserSchema = new Schema(UserSchemaFields, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret._id;
    },
    versionKey: false,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashed = await bcrypt.hash(this.get('password'), 10);
    this.set('password', hashed);
  }

  next();
});

UserSchema.statics.build = (attrs: IUser) => new User({ ...attrs });

const User = model<IUserDoc, IUserModel>('User', UserSchema);

export { User };
export type { IUser };
