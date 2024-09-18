import Grid from '@mui/material/Grid2';
import {CircularProgress, Grow, Paper, Typography} from '@mui/material';

const Posts = () => {
  const fetching = false
  const posts = [ 1 , 2, 3]

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography component="h1" variant="h5" sx={{my:4}}>Posts</Typography>
      </Grid>
      {fetching && <Grid size={12} sx={{textAlign: 'center'}}> <CircularProgress color="warning"/> </Grid>}

      {posts.length > 0 && posts.map((post, index) => {
        return (
          <Grid size={3} key={post}>
            <Grow
              in={true}
              style={{transformOrigin: '0 0 0'}}
              {...{timeout: index * 500}}
            >
              <Paper elevation={4}>
                {post}
              </Paper>
            </Grow>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;