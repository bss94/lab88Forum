import Grid from '@mui/material/Grid2';
import {Alert, CircularProgress, Typography} from '@mui/material';
import {useAppSelector} from '../../../../app/hooks.ts';
import CommentItem from './CommentItem.tsx';
import {selectComments, selectFetchingComments} from '../../postsSlice.ts';
import CommentsForm from './CommentsForm.tsx';
import {selectUser} from '../../../Users/usersSlice.ts';

const Comments = () => {
  const comments = useAppSelector(selectComments);
  const fetchingComments = useAppSelector(selectFetchingComments);
  const user = useAppSelector(selectUser);
  return (
    <Grid container direction="column" width={'100%'} sx={{px: 8}}>
      <Typography variant="h4" sx={{my: 1}}>
        Comments
      </Typography>

      {!user
        ? <Alert severity="info" sx={{my: 3}}>
          You must be logged to create comments!
        </Alert>
        : <CommentsForm/>
      }

      {fetchingComments ?
        <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress color="warning"/></Grid>
        :
        comments.length === 0
          ?
          <Grid size={12}>
            <Typography variant="subtitle2" sx={{my: 1}}>
              Not comments yet
            </Typography>
          </Grid>
          :
          comments.map((comment) => (
            <CommentItem author={comment.author.username} date={comment.date} text={comment.message}
                         key={comment._id}/>
          ))
      }

    </Grid>
  );
};

export default Comments;