import Grid from '@mui/material/Grid2';
import {CircularProgress, Typography} from '@mui/material';
import {useAppSelector} from '../../../../app/hooks.ts';
import CommentItem from './CommentItem.tsx';
import {selectComments, selectFetchingComments} from '../../postsSlice.ts';
import CommentsForm from './CommentsForm.tsx';

const Comments = () => {
  const comments = useAppSelector(selectComments);
  const fetchingComments = useAppSelector(selectFetchingComments);
  return (
    <Grid container direction="column" sx={{px: 8}}>
      <Typography variant="h4" sx={{my: 1}}>
        Comments
      </Typography>
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
            <CommentItem id={comment._id} author={comment.author} text={comment.message}
                         key={comment._id}/>
          ))
      }
      <CommentsForm/>
    </Grid>
  );
};

export default Comments;