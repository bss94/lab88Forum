import React from 'react';
import {Card, CardMedia, Typography} from '@mui/material';
import {API_URL, setDate} from '../../../constants.ts';
import {OnePost} from '../../../types.ts';
import Grid from '@mui/material/Grid2';

interface Props {
  post: OnePost;
}

const FullPost: React.FC<Props> = ({post}) => {

  let imageField = (
    <Grid size={6}>
      <CardMedia
        component="img"
        sx={{width: 300}}
        image={`${API_URL}/${post.image}`}
        alt="post image"
      />
    </Grid>
  );
  if (!post.image) {
    imageField = (
      <></>
    );
  }
  return (
    <Card variant="outlined" sx={{m: 2, p: 2, width: '100%'}}>
      <Grid container spacing={2} alignItems="center">
        {imageField}
        <Grid size={!post.image ? 12 : 6}>
          <Typography variant="h4">
            {post.title}
          </Typography>
          <Typography sx={{fontSize: 12}} color="text.secondary">
            {setDate(post.date)} by <strong>{post.author.username}</strong>
          </Typography>
        </Grid>
        {post.description && (
          <Grid size={12}>
            <Typography sx={{fontSize: 16}} color="text.secondary">
              {post.description}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default FullPost;