import {createSlice} from '@reduxjs/toolkit';
import {IComment, Post} from '../../types.ts';


export interface PostState {
  posts: Post[];
  fetchingPosts: boolean;
  creatingPost: boolean;
  onePost: Post | null;
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
  extraReducers: () => {
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


