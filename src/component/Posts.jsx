import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';

import PostImage from './PostImage';
import { useFetchAllPostsQuery } from '../api/action-apis/postApi';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useFetchAllPostsQuery(page);
  useEffect(() => {
    if (!isLoading && data) {
      setPosts((prevPosts) => [...prevPosts, ...data.data.data]);
    }
  }, [data, isLoading]);
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.scrollY ||
        window.pageYOffset ||
        document.body.scrollTop +
          ((document.documentElement && document.documentElement.scrollTop) ||
            0);

      if (windowHeight + scrollTop >= documentHeight) {
        console.log('hit');
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function changeDateFormat(dateString) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }

  if (!posts || posts.length === 0) {
    return <h1 className="no-data">No post to show</h1>;
  }

  return (
    <div className="outlet-box card">
      {posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((post, index) => (
          <Card
            key={index}
            sx={{ maxWidth: 445, minWidth: 300 }}
            className="card-box"
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="" />
              }
              title={post.userData.username}
              subheader={changeDateFormat(post.createdAt)}
            />
            <Typography variant="body2" color="text.secondary"></Typography>
            <PostImage postIdProp={post._id} />
            <CardContent>
              <CardActions disableSpacing></CardActions>
              <Typography variant="body2" color="text.secondary">
                {post.description}{' '}
              </Typography>
            </CardContent>
          </Card>
        ))}
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && data.data.data.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No more data to load
        </Typography>
      )}
    </div>
  );
};

Posts.propTypes = {
  allPostsProp: PropTypes.array,
};

export default Posts;
