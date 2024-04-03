import * as React from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useFetchAllPostsQuery } from '../../api/action-apis/postApi';

export default function Feed() {
  const { data, isLoading } = useFetchAllPostsQuery();
  const allPosts = !isLoading && data?.data.data;
  const oneStaticPost = allPosts[3];
  console.log(oneStaticPost);
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    console.log('');
  }
  return (
    <div className="outlet-box card">
      <Card sx={{ maxWidth: 445, minWidth: 300 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src=""
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Ritik Singh"
          subheader="April 03, 2024"
        />
        <CardMedia
          className="card-image"
          component="img"
          height="194"
          style={{ objectFit: 'contain' }}
          image={require('../../assets/2cb9825c-50af-459c-9a05-58d0cc192430.jpg')}
          alt="R"
        />
        <CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
