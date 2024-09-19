import {createSlice} from '@reduxjs/toolkit';
import {IComment, OnePost, Post} from '../../types.ts';
import {createNewComment, fetchOnePost, fetchPostComments, fetchPosts} from './postsThunks.ts';


export interface PostState {
  posts: Post[];
  fetchingPosts: boolean;
  creatingPost: boolean;
  onePost: OnePost | null;
  fetchOnePost: boolean;
  comments: IComment[];
  fetchComments: boolean;
  creatingComment: boolean;
}

const initialState: PostState = {
  posts: [],
  fetchingPosts: false,
  creatingPost: false,
  onePost: null,
  fetchOnePost: false,
  comments: [],
  fetchComments: false,
  creatingComment: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetOnePost: (state) => {
      state.onePost = null;
      state.comments = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.fetchingPosts = true;
    })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchingPosts = false;
      })
      .addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
        state.posts = posts;
        state.fetchingPosts = false;
      });
    builder.addCase(fetchOnePost.pending, (state) => {
      state.fetchOnePost = true;
    })
      .addCase(fetchOnePost.rejected, (state) => {
        state.fetchOnePost = false;
      })
      .addCase(fetchOnePost.fulfilled, (state, {payload: onePost}) => {
        state.onePost = onePost.post;
        state.comments = onePost.comments;
        state.fetchOnePost = false;
      });
    builder.addCase(fetchPostComments.pending, (state) => {
      state.fetchComments = true;
    })
      .addCase(fetchPostComments.rejected, (state) => {
        state.fetchComments = false;
      })
      .addCase(fetchPostComments.fulfilled, (state, {payload: comments}) => {
        state.comments = comments;
        state.fetchComments = false;
      });
    builder.addCase(createNewComment.pending, (state) => {
      state.creatingComment = true;
    })
      .addCase(createNewComment.rejected, (state) => {
        state.creatingComment = false;
      })
      .addCase(createNewComment.fulfilled, (state) => {
        state.creatingComment = false;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectOnePost: (state) => state.onePost,
    selectComments: (state) => state.comments,
    selectFetchingPosts: (state) => state.fetchingPosts,
    selectFetchOnePosts: (state) => state.fetchOnePost,
    selectFetchingComments: (state) => state.fetchComments,
    selectCreatingPost: (state) => state.creatingPost,
    selectCreatingComment: (state) => state.creatingComment,
  },
});
export const postsReducers = postsSlice.reducer;

export const {resetOnePost} = postsSlice.actions;

export const {
  selectPosts,
  selectComments,
  selectCreatingPost,
  selectFetchingComments,
  selectCreatingComment,
  selectOnePost,
  selectFetchingPosts,
  selectFetchOnePosts
} = postsSlice.selectors;


