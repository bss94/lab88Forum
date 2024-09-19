import React, {useState} from 'react';
import Grid from '@mui/material/Grid2';
import {LoadingButton} from '@mui/lab';
import {TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks.ts';
import {selectCreatingComment, selectOnePost} from '../../postsSlice.ts';

const CommentsForm = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectOnePost);
  const postId = post?._id;
  const sending = useAppSelector(selectCreatingComment);
  const [message, setMessage] = useState<string>('');

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setMessage(value);
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid size={10}>
        <TextField
          label="Message"
          id="message"
          name="message"
          fullWidth
          value={message}
          onChange={inputChangeHandler}/>
      </Grid>
      <Grid size={2}>
        <LoadingButton
          type="submit"
          loading={sending}
          loadingPosition="center"
          variant="contained"
        >
          <span>Send</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CommentsForm;