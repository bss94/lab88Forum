import {useParams} from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import {CircularProgress, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {resetOnePost, selectFetchOnePosts, selectOnePost} from './postsSlice.ts';
import {useEffect} from 'react';
import {fetchOnePost} from './postsThunks.ts';
import Comments from './components/Comments/Comments.tsx';
import FullPost from './components/FullPost.tsx';


const OnePost = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const fetching = useAppSelector(selectFetchOnePosts);
  const post = useAppSelector(selectOnePost);

  useEffect(() => {
    dispatch(resetOnePost());
    if (id) {
      dispatch(fetchOnePost(id));
    }
  }, [id, dispatch]);
  return (
    <Grid container spacing={2}>
      {fetching ?
        <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress color="warning"/></Grid>
        : post && <>
        <FullPost post={post}/>
        <Comments/>
      </>
      }
      {!post && !fetching &&
        <Grid size={12}>
          <Typography variant="h4" sx={{my: 3}}>
            Post not found!
          </Typography>
        </Grid>
      }
    </Grid>
  );
};

export default OnePost;