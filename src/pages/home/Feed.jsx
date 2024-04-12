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
import { useSearchParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import ReactSearchBox from 'react-search-box';

import {
  useFetchAllPostsQuery,
  useGetPostsQuery,
} from '../../api/action-apis/postApi';
import PostImage from '../../component/PostImage';

const Feed = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [, setAllCaughtUp] = useState(false);
  const { data, isLoading, isFetching } = useFetchAllPostsQuery(page);
  const { data: matchedData } = useGetPostsQuery(searchParams);

  useEffect(() => {
    if (!isLoading && data) {
      setPosts((prevPosts) => {
        const newData = data.data.data.filter(
          (newPost) => !prevPosts.some((post) => post._id === newPost._id)
        );
        const sortedData = [...newData, ...prevPosts].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return sortedData;
      });

      if (data.data.data.length === 0) {
        setAllCaughtUp(true);
      }
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

      if (
        windowHeight + scrollTop >= documentHeight &&
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

  function changeDateFormat(dateString) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }

  const handleSearch = (e) => {
    setSearchParams(`search=${e}`);
    console.log(matchedData);
    console.log(data);
    if (e.length === 0) {
      setSearchParams('');
    }
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
      <div className="search-box">
        <ReactSearchBox
          className="search"
          placeholder={'Search posts'}
          onChange={(e) => {
            handleSearch(e);
          }}
          // data={thi}
          // callback={(record) => console.log(record)}
        />
      </div>
      <ScrollToTop smooth />
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
      ))}
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
