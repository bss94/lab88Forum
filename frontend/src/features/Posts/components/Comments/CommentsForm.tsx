import React, {useState} from 'react';
import Grid from '@mui/material/Grid2';
import {LoadingButton} from '@mui/lab';
import {TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks.ts';
import {selectCreatingComment, selectOnePost} from '../../postsSlice.ts';
import {createNewComment, fetchPostComments} from '../../postsThunks.ts';
import {ICommentMutation} from '../../../../types.ts';

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
    if (postId) {
      const commentMutation: ICommentMutation = {
        post: postId,
        message: message,
      };
      await dispatch(createNewComment(commentMutation));
      setMessage('');
      dispatch(fetchPostComments(postId));
    }
  };
  return (
    <Grid container
          spacing={2}
          alignItems="center"
          component="form"
          onSubmit={submitFormHandler}
          sx={{my: 2}}
    >
      <Grid size={10}>
        <TextField
          label="Comment"
          id="message"
          name="message"
          fullWidth
          value={message}
          required
          onChange={inputChangeHandler}
          color="warning"/>

      </Grid>
      <Grid size={2}>
        <LoadingButton
          fullWidth
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

export default CommentsForm;