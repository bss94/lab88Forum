import mongoose, {HydratedDocument, Types} from 'mongoose';
import {PostFields, PostModel} from '../types';
import User from './User';


const Schema = mongoose.Schema;

const PostSchema = new Schema<PostFields, PostModel>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'Author does not exist',
    },
  },
  description: {
    type: String,
    validate: {
      async validator(value?: string): Promise<boolean> {
        const currentDocument = (this as HydratedDocument<PostFields>);
        return !!(value || currentDocument.image);
      },
      message: 'Image or description must be present!',
    }
  },
  image: {
    type: String,
    validate: {
      async validator(value?: string): Promise<boolean> {
        const currentDocument = (this as HydratedDocument<PostFields>);
        return !!(value || currentDocument.description);
      },
      message: 'Image or description must be present!',
    }
  },
  date: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model<PostFields, PostModel>('Post', PostSchema);

export default Post;