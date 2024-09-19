import Grid from '@mui/material/Grid2';
import {CircularProgress, Grow, Paper, Typography} from '@mui/material';
import PostItem from './components/PostItem.tsx';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {selectFetchingPosts, selectPosts} from './postsSlice.ts';
import { useEffect } from 'react';
import {fetchPosts} from './postsThunks.ts';

const Posts = () => {
  const dispatch = useAppDispatch();
  const fetching = useAppSelector(selectFetchingPosts)
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5" sx={{my:4}}>Posts</Typography>
      </Grid>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress color="warning"/> </Grid>}

      {posts.length > 0 && posts.map((post, index) => {
        return (
          <Grid size={12} key={post._id}>
            <Grow
              in={true}
              style={{transformOrigin: '0 0 0'}}
              {...{timeout: index * 500}}
            >
              <Paper elevation={4}>
                <PostItem
                  author={post.author}
                  title={post.title}
                  id={post._id}
                  date={post.date}
                />
              </Paper>
            </Grow>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;