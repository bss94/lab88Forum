import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {PostMutation} from '../../../types.ts';
import {selectUser} from '../../Users/usersSlice.ts';
import Grid from '@mui/material/Grid2';
import {TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import FileInput from '../../../UI/FileInput/FileInput.tsx';
import {selectCreatingPost} from '../postsSlice.ts';
import {createNewPost} from '../postsThunks.ts';

const PostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const sending = useAppSelector(selectCreatingPost);
  const [state, setState] = useState<PostMutation>({
    title: '',
    description: '',
    image: null,
  });
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(createNewPost(state));
      navigate('/');
    } catch (e) {

    }
  };

  return (
    <Grid container width="100%" direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid>
        <Typography component="h1" variant="h5" sx={{my: 4}}>Create new post</Typography>
      </Grid>
      <Grid>
        <TextField
          required
          fullWidth
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          color="warning"
        />
      </Grid>
      <Grid>
        <TextField
          required={!state.image}
          fullWidth
          multiline
          minRows={3}
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
          color="warning"
        />
      </Grid>
      <Grid>
        <FileInput label="Image"
                   name="image"
                   onChange={fileInputChangeHandler}
                   required={!state.description}
        />
      </Grid>

      <Grid>
        <LoadingButton
          type="submit"
          loading={sending}
          loadingPosition="center"
          variant="contained"
          color="warning"
        >
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default PostForm;