import React from 'react';

import { CardMedia } from '@mui/material';
import PropTypes from 'prop-types';

import { useFetchPostImgQuery } from '../api/action-apis/postApi';

const PostImage = ({ postIdProp }) => {
  const { data: imageData, isLoading: isImageLoading } =
    useFetchPostImgQuery(postIdProp);
  if (isImageLoading) {
    return null;
  }

  return (
    <>
      <CardMedia
        className="card-image"
        component="img"
        height="194"
        style={{ objectFit: 'contain' }}
        src={imageData ? imageData.imageData : null}
        alt="Not available"
      />
    </>
  );
};

export default PostImage;
PostImage.propTypes = {
  postIdProp: PropTypes.string,
};
