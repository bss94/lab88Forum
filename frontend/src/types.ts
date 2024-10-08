export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Author {
  _id: string;
  username: string;
}

export interface Post {
  _id: string;
  author: Author;
  title: string;
  image: string | null;
  date: string;
  comments: number;
}

export interface OnePost {
  _id: string;
  author: Author;
  title: string;
  description?: string;
  image: string | null;
  date: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: string | null;
}

export interface IComment {
  _id: string;
  author: Author;
  post: string;
  message: string;
  date: string;
}

export interface ICommentMutation {
  post: string;
  message: string;
}

export interface OnePostResponse {
  post: OnePost;
  comments: IComment[];
}