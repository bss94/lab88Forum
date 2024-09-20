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
    <Grid size={{md: 5, sm: 12}}>
      <CardMedia
        component="img"
        sx={{width: '100%'}}
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
      <Grid container spacing={2}>
        {imageField}
        <Grid size={{md: !post.image ? 12 : 7, sm: 12}}>
          <Typography sx={{fontSize: 12}} color="text.secondary" textAlign="end">
            {setDate(post.date)} by <strong>{post.author.username}</strong>
          </Typography>
          <Typography variant="h4" textAlign="center" marginTop={{md: 10, sm: 2}}>
            {post.title}
          </Typography>

        </Grid>
        {post.description && (
          <Grid size={12}>
            <Typography sx={{fontSize: 16}} textAlign={!post.image ? 'center' : 'start'} color="text.secondary">
              {post.description}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default FullPost;