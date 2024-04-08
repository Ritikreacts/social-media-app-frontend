import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { io } from 'socket.io-client'; // Import io from socket.io-client

import PostImage from './PostImage';
import { useFetchAllPostsQuery } from '../api/action-apis/postApi';
import { getCookie } from '../services/cookieManager';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } = useFetchAllPostsQuery(page);

  useEffect(() => {
    const socket = io('http://localhost:5000', {
      extraHeaders: {
        token: getCookie(),
      },
    });

    socket.on('new-post', (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      const newData = data.data.data;
      setPosts((prevPosts) => [...prevPosts, ...newData]);
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

  if (isLoading || (isFetching && page === 0)) {
    return (
      <div className="outlet-box card">
        <CircularProgress />
      </div>
    );
  }
  if (!posts || posts.length === 0) {
    return <div className="outlet-box card">No post to show</div>;
  }

  return (
    <div className="outlet-box card">
      {posts.map((post) => (
        <Card
          key={post._id}
          sx={{ maxWidth: 445, minWidth: 300 }}
          className="card-box"
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="" />
            }
            title={post?.userData?.username}
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
      {!isLoading && data && data.data.data.length > 5 && <CircularProgress />}
      {!isLoading && data && data.data.data.length === 0 && (
        <Typography variant="body2" color="text.secondary" className="no-more">
          You are all done!
        </Typography>
      )}
    </div>
  );
};

Posts.propTypes = {
  allPostsProp: PropTypes.array,
};

export default Posts;
