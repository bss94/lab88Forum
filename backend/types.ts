import mongoose, {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;

export interface PostFields {
  title: string;
  author: mongoose.Schema.Types.ObjectId;
  description: string;
  image: string;
  date: Date;
}

export type PostModel = Model<PostFields, {}, {}>
