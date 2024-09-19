import express from 'express';
import mongoose from 'mongoose';
import Comment from '../models/Comment';
import auth, {RequestWithUser} from '../middleware/auth';


const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    const comment = await Comment.find().populate('author', 'username').sort({date: -1});
    return res.send(comment);
  } catch (error) {
    next(error);
  }
});
commentsRouter.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.find({post: req.params.id}).populate('author', 'username').sort({date: -1});
    return res.send(comment);
  } catch (error) {
    next(error);
  }
});
commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({error: 'Unauthorized'});
    }
    const commentsData = {
      author: req.user._id,
      post: req.body.post,
      message: req.body.message,
      date: new Date(),
    };

    const comment = new Comment(commentsData);
    await comment.save();
    return res.send(comment);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    next(error);
  }
});

export default commentsRouter;