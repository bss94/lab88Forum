import {createAsyncThunk} from '@reduxjs/toolkit';
import {IComment, Post} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const {data: posts} = await axiosApi.get<Post[]>('/posts');
    return posts;
  }
);
export const fetchOnePost = createAsyncThunk<Post, string>(
  'posts/fetchOnePost',
  async (id) => {
    const {data: post} = await axiosApi.get<Post>(`/posts/${id}`);
    return post;
  }
);
export const fetchPostComments = createAsyncThunk<IComment[], string>(
  'posts/fetchPostComments',
  async (postId) => {
    const {data: comments} = await axiosApi.get<IComment[]>(`/comments/${postId}`);
    return comments;
  }
);