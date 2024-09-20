import React from 'react';
import {Box, Button, Card, CardContent, CardMedia, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {API_URL, setDate} from '../../../constants.ts';
import TextsmsIcon from '@mui/icons-material/Textsms';

interface Props {
  id: string;
  title: string;
  author: string;
  image: string | null;
  date: string;
  comments: number;
}

const PostItem: React.FC<Props> = ({
  id, title, author, date, image, comments
}) => {

  let imageField = (
    <CardMedia
      component="img"
      sx={{width: 151, height: 151}}
      image={`${API_URL}/${image}`}
      alt="posts image"
    />
  );
  if (!image) {
    imageField = (
      <Box display="flex" alignItems="center" justifyContent="center" sx={{width: 151, height: 151}}>
        <TextsmsIcon color="warning" sx={{fontSize: 60}}/>
      </Box>
    );
  }

  return (
    <Card variant="outlined" sx={{display: 'flex', mb: 1}}>
      {imageField}
      <CardContent sx={{width: '100%'}}>
        <Typography sx={{fontSize: 14, textAlign: 'end'}} color="text.secondary">
          {setDate(date)} by <strong>{author}</strong>
        </Typography>
        <Typography variant="body2" component="div">
          <NavLink to={`/posts/${id}`}><Button variant="text">{title} . . .</Button></NavLink>
        </Typography>
        <Typography variant="body2" component="div">
          Comments: {comments}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostItem;