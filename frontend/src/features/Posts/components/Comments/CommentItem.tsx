import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';

interface Props {
  author: string;
  text: string;
  id: string;
}

const CommentItem: React.FC<Props> = ({author, text}) => {
  return (
    <Card variant="outlined" sx={{mb: 1}}>
      <CardContent sx={{width: '100%'}}>
        <Typography variant="h6">
          {author}
        </Typography>
          <Typography sx={{fontSize: 12}} color="text.secondary">
            {text}
          </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentItem;