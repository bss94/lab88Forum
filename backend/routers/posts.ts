import express from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';

const postsRouter = express.Router();

postsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    const post = new Post({
      title: req.body.title,
      author: req.user._id,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      date: new Date(),
    });
    await post.save();
    return res.send(post);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default postsRouter;