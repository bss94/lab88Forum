import {NextFunction, Request, Response} from 'express';
import {HydratedDocument} from 'mongoose';
import {UserFields, UserMethods} from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>;
}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');
  if (!headerValue) {
    return res.status(401).send({error: 'Unauthorized'});
  }
  const [_bearer, token] = headerValue.split(' ');
  if (!token) {
    return res.status(401).send({error: 'Unauthorized'});
  }
  const user = await User.findOne({token});
  if (!user) {
    return res.status(401).send({error: 'Unauthorized'});
  }
  req.user = user;
  return next();
};

export default auth;