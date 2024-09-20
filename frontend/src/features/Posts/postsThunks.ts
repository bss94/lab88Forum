import {createAsyncThunk} from '@reduxjs/toolkit';
import {IComment, ICommentMutation, OnePostResponse, Post, PostMutation} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {RootState} from '../../app/store.ts';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchPosts',
  async () => {
    const {data: posts} = await axiosApi.get<Post[]>('/posts');
    return posts;
  }
);
export const fetchOnePost = createAsyncThunk<OnePostResponse, string>(
  'posts/fetchOnePost',
  async (id) => {
    const {data: post} = await axiosApi.get<OnePostResponse>(`/posts/${id}`);
    return post;
  }
);
export const fetchPostComments = createAsyncThunk<IComment[], string>(
  'comments/fetchPostComments',
  async (postId) => {
    const {data: comments} = await axiosApi.get<IComment[]>(`/comments/${postId}`);
    return comments;
  }
);

export const createNewComment = createAsyncThunk<void, ICommentMutation, { state: RootState }>(
  'comments/createNewComment',
  async (commentMutation, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.post<IComment>('/comments', commentMutation, {headers: {'Authorization': `Bearer ${token}`}});
  }
);
export const createNewPost = createAsyncThunk<void, PostMutation, { state: RootState }>(
  'posts/createNewPost',
  async (postMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();
    const keys = Object.keys(postMutation) as (keyof PostMutation)[];
    keys.forEach((key) => {
      const value = postMutation[key];
      if (value !== null) {
        formData.append(key, value);
      }
    });
    await axiosApi.post<Post>('/posts', formData, {headers: {'Authorization': `Bearer ${token}`}});
  }
);