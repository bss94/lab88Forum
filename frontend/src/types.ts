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

export interface Post {
  _id: string;
  author: string;
  title: string;
  description?: string;
  image?: string;
  date: string;
}

export interface IComment {
  _id: string;
  author: string;
  postId: string;
  message: string;
  date: string;
}