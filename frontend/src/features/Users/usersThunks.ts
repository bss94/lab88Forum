import {createAsyncThunk} from '@reduxjs/toolkit';
import {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import {isAxiosError} from 'axios';
import {RootState} from '../../app/store.ts';
import {unsetUser} from './usersSlice.ts';


export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<User>('/users', registerMutation);
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users/login',
  async (loginMutation, {rejectWithValue}) => {
    try {
      const {data: user} = await axiosApi.post<User>('/users/sessions', loginMutation);
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);
export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users/logout',
  async (_arg, {getState, dispatch}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', {headers: {Authorization: `Bearer ${token}`}});
    dispatch(unsetUser());
  },
);