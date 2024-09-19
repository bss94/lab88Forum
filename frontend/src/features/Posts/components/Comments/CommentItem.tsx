import React from 'react';
import {Card, CardContent, Typography} from '@mui/material';
import {setDate} from '../../../../constants.ts';

interface Props {
  author: string;
  text: string;
  date: string;
}

const CommentItem: React.FC<Props> = ({author, text, date}) => {
  return (
    <Card variant="outlined" sx={{mb: 1}}>
      <CardContent sx={{width: '100%'}}>
        <Typography textAlign="end" sx={{fontSize: 15, mb: 1}}>
          {setDate(date)} <strong> {author} </strong> says:
        </Typography>
        <Typography sx={{fontSize: 14}} color="text.secondary">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentItem;