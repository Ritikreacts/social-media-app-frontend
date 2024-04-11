/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';

import { useFetchAllPostsQuery } from '../../api/action-apis/postApi';
import PostImage from '../../component/PostImage';
import { changeDateFormat } from '../../services/changeDateFormate'; // Fixed typo here

const Feed = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  const [page, setPage] = useState(1);
  const containerRef = useRef();
  const { data, isLoading, isFetching } = useFetchAllPostsQuery(page);

  useEffect(() => {
    if (!isLoading && data) {
      setPosts((prevPosts) => {
        const newData = data.data.data.filter(
          (newPost) => !prevPosts.some((post) => post._id === newPost._id)
        );
        const sortedData = [...newData, ...prevPosts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return sortedData;
      });
    }
  }, [data, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      console.log('scrolled');
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight &&
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
  }, [isFetching, data, posts]);

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

  const Row = ({ index, style }) => {
    const post = posts[index];

    return (
      <div style={style}>
        <Card sx={{ maxWidth: 445, minWidth: 300 }} className="card-box">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src="" />
            }
            title={post.userData?.username || post.userId?.username}
            subheader={changeDateFormat(post.createdAt)}
          />
          <PostImage postIdProp={post._id} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post?.description}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="sub-container">
      <VariableSizeList
        className="list"
        height={window.innerHeight}
        itemCount={posts.length}
        itemSize={(number) => 400}
        width="100%"
        ref={containerRef}
      >
        {({ index, style }) => <Row index={index} style={style} />}
      </VariableSizeList>
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
