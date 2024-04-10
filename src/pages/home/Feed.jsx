/* eslint-disable react/prop-types */
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
import ScrollToTop from 'react-scroll-to-top';
import { FixedSizeList as List } from 'react-window';

import { useFetchAllPostsQuery } from '../../api/action-apis/postApi';
import PostImage from '../../component/PostImage';

const Feed = () => {
  const [page, setPage] = useState(1);
  const [, setAllCaughtUp] = useState(false);
  const { data, isLoading, isFetching } = useFetchAllPostsQuery(page);

  const posts = data?.data?.data || [];

  useEffect(() => {
    if (data?.data?.data?.length === 0) {
      setAllCaughtUp(true);
    }
  }, [data]);

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
      const distanceFromBottom = documentHeight - scrollTop - windowHeight;

      // Adjust the threshold value as needed
      const threshold = 200;

      if (
        distanceFromBottom < threshold &&
        !isFetching &&
        posts.length < data?.data?.total
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, data, posts.length]);

  function changeDateFormat(dateString) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }

  const Row = ({ index, style }) => {
    const post = posts[index];

    if (!post) {
      // Post is being loaded, render a placeholder
      return <div style={style}>Loading...</div>;
    }

    return (
      <div style={style}>
        <Card
          style={{
            maxWidth: 445,
            minWidth: 300,
            marginBottom: 10, // Adjust as needed
          }}
        >
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="" />
            }
            title={post.userData?.username || post.userId?.username}
            subheader={changeDateFormat(post.createdAt)}
          />
          <PostImage postIdProp={post._id} />
          <CardContent>
            <CardActions disableSpacing></CardActions>
            <Typography variant="body2" color="text.secondary">
              {post?.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (isLoading || (isFetching && page === 1)) {
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
      <ScrollToTop smooth />
      <List
        height={window.innerHeight}
        itemCount={posts.length}
        itemSize={300} // Adjust as needed
        width="100%"
      >
        {Row}
      </List>
      {!isFetching && posts.length === data?.data?.total && (
        <Typography variant="body2" color="text.secondary" className="no-more">
          You are all caught up!
        </Typography>
      )}

      {isFetching && <CircularProgress />}
    </div>
  );
};

Feed.propTypes = {
  allPostsProp: PropTypes.array,
};

export default Feed;
