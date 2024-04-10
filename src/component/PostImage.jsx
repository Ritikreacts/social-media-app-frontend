import React from 'react';

import { CardMedia, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

import { useFetchPostImgQuery } from '../api/action-apis/postApi';

const PostImage = ({ postIdProp }) => {
  const { data: imageData, isLoading: isImageLoading } =
    useFetchPostImgQuery(postIdProp);
  if (isImageLoading) {
    return (
      <div className="card-image image-loader">
        <CircularProgress className="card-image" component="img" height="194" />
      </div>
    );
  }
  return (
    <>
      <CardMedia
        className="card-image"
        component="img"
        height="194"
        style={{ objectFit: 'contain' }}
        src={imageData ? imageData.imageData : null}
        alt="user-image"
      />
    </>
  );
};

export default PostImage;
PostImage.propTypes = {
  postIdProp: PropTypes.string,
};
