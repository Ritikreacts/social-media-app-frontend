import React, { useRef, useState } from 'react';

import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { useCreatePostMutation } from '../api/action-apis/postApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 100,
  p: 4,
  textAlign: 'center',
  cursor: 'pointer',
};

const CreatePost = ({ openProfile, setOpenProfile }) => {
  const [createPost] = useCreatePostMutation();
  const [image, setImage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInputRef = useRef();

  const handleClose = () => setOpenProfile(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  function handleImageChange(e) {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  }
  const onSubmit = async (postData) => {
    const postDetails = {
      ...postData,
      image,
      isPrivate: false,
    };
    setOpenProfile(false);

    try {
      const response = await createPost(postDetails);
      if (response?.data) {
        enqueueSnackbar('Post created successfully!', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      } else {
        enqueueSnackbar(response.error.data.message, {
          variant: 'error',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={openProfile}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create post
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('image', {
                validate: (value) => {
                  if (!image) {
                    console.log('in error', value);
                    return 'Image is required to create post';
                  } else {
                    return true;
                  }
                },
              })}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={(e) => handleImageChange(e)}
            />
            <div onClick={handleImageClick} style={{ marginBottom: 20 }}>
              <Avatar
                className="avatar-upload"
                variant="rounded"
                src={image ? URL.createObjectURL(image) : ''}
                style={{
                  width: 300,
                  height: 200,
                  cursor: 'pointer',
                  margin: 'auto',
                }}
              >
                Add Photo
              </Avatar>
              {errors.image && !image && (
                <div className="error">{errors.image.message}</div>
              )}
            </div>
            <TextField
              {...register('title', {
                required: 'Title is required',
              })}
              label="Title"
              fullWidth
              margin="normal"
            />
            {errors.title && (
              <div className="error">{errors.title.message}</div>
            )}
            <TextField
              {...register('description', {
                required: 'Description is required',
              })}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            {errors.description && (
              <div className="error">{errors.description.message}</div>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10, marginTop: 10 }}
              className="color-green"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClose}
              className="color-red"
              style={{ marginTop: 10 }}
            >
              Back
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

CreatePost.propTypes = {
  openProfile: PropTypes.bool.isRequired,
  setOpenProfile: PropTypes.func.isRequired,
};

export default CreatePost;
