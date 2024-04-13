import React, { useEffect, useState } from 'react';

import {
  CircularProgress,
  Typography,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { red } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import ReactSearchBox from 'react-search-box';

import {
  useFetchAllPostsQuery,
  useGetPostsQuery,
  useGetPrivatePostsQuery,
  useGetYourPostsQuery,
} from '../../api/action-apis/postApi';
import PostImage from '../../component/PostImage';

const Feed = () => {
  const [, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [, setAllCaughtUp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [myPostsOnly, setMyPostsOnly] = useState(false);
  const [isPostPrivate, setIsPostPrivate] = useState(false);
  const {
    data: allPostData,
    isLoading: allPostsLoading,
    isFetching: allPostsFetching,
  } = useFetchAllPostsQuery(page, { refetchOnMountOrArgChange: true });
  const { data: matchedData, isLoading: searchLoading } = useGetPostsQuery(
    searchQuery,
    { refetchOnMountOrArgChange: true }
  );
  const { data: myPostsData } = useGetYourPostsQuery({
    myPostsOnly,
    refetchOnMountOrArgChange: true,
  });
  const { data: privatePosts } = useGetPrivatePostsQuery({
    isPostPrivate,
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (!allPostsLoading && allPostData) {
      setPosts((prevPosts) => {
        const newData = allPostData.data.data.filter(
          (newPost) => !prevPosts.some((post) => post._id === newPost._id)
        );
        const sortedData = [...newData, ...prevPosts].sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return sortedData;
      });

      if (allPostData.data.data.length === 0) {
        setAllCaughtUp(true);
      }
    }
  }, [allPostData, allPostsLoading]);

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
        !allPostsFetching &&
        posts.length < allPostData?.data?.total
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [allPostsFetching, allPostData, posts]);

  function changeDateFormat(dateString) {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  }

  const handleSearch = async (e) => {
    setSearchQuery(e);
    const searchString = `search=${e}`;
    setSearchParams(searchString);
    if (e.length === 0) {
      setSearchParams('');
    }
  };

  const handleMyPostsOnly = (e) => {
    setMyPostsOnly(e.target.checked);
    console.log(myPostsOnly);
    const filterString = `isMyPostOnly=${true}`;
    setSearchParams(e.target.checked ? filterString : '');
  };
  const handlePrivatePosts = (e) => {
    setIsPostPrivate(e.target.checked);
    const filterString = `isPrivate=${true}`;
    setSearchParams(e.target.checked ? filterString : '');
  };

  if (allPostsLoading || searchLoading || (allPostsFetching && page === 1)) {
    return (
      <div className="outlet-box card">
        <CircularProgress />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="outlet-box card">No post to show</div>;
  }

  let displayPosts;
  if (myPostsOnly) {
    displayPosts = myPostsData.data.data;
  } else if (searchQuery) {
    displayPosts = matchedData.data.data;
  } else if (isPostPrivate) {
    displayPosts = privatePosts.data.data;
  } else {
    displayPosts = posts;
  }
  return (
    <div className="outlet-box card">
      <div className="search-box">
        <div className="checkbox pointer">
          <label htmlFor="check">My posts only?</label>
          <input type="checkbox" id="check" onChange={handleMyPostsOnly} />
        </div>
        <ReactSearchBox
          className="search pointer"
          placeholder={'Search posts'}
          onChange={(e) => handleSearch(e)}
        />
        <div className="checkbox pointer">
          <label htmlFor="privacy">Private posts only?</label>
          <input type="checkbox" id="privacy" onChange={handlePrivatePosts} />
        </div>
      </div>
      <ScrollToTop smooth />
      {displayPosts.length > 0 ? (
        displayPosts.map((post) => (
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
                Title - {post?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Caption - {post?.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography
          variant="body2"
          color="text.secondary"
          className="outlet-box no-post"
        >
          No match found
        </Typography>
      )}
      {!allPostsFetching && posts.length === allPostData?.data?.total && (
        <Typography variant="body2" color="text.secondary" className="no-more">
          You are all caught up!
        </Typography>
      )}
      {allPostsFetching && <CircularProgress />}
    </div>
  );
};

Feed.propTypes = {
  allPostsProp: PropTypes.array,
};

export default Feed;
