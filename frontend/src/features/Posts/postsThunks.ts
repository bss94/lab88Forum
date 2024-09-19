import {createAsyncThunk} from '@reduxjs/toolkit';
import {IComment, ICommentMutation, OnePostResponse, Post} from '../../types.ts';
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

export const createNewComment = createAsyncThunk<void,ICommentMutation,{ state: RootState }>(
  'comments/createNewComment',
  async (commentMutation, {getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.post<IComment>('/comments', commentMutation, {headers: {'Authorization': `Bearer ${token}`}});
  }
)