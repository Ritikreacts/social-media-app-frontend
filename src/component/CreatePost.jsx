import React, { useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Avatar,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { useSnackbarUtils } from './Notify';
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

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const CreatePost = ({ openProfile, setOpenProfile }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbarUtils();
  const navigate = useNavigate();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [image, setImage] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fileInputRef = useRef();

  const handleClose = () => setOpenProfile(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onSubmit = async (postData) => {
    const postDetails = {
      ...postData,
      image,
      isPrivate: privacy === 'private',
    };

    try {
      const response = await createPost(postDetails);
      if (response?.data) {
        setOpenProfile(false);
        showSuccessSnackbar('New post added!');
        navigate('/home/feed');
      } else {
        showErrorSnackbar(response.error.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrivacyChange = (e) => {
    setPrivacy(e.target.value);
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
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div onClick={handleImageClick} style={{ marginBottom: 20 }}>
              <Avatar
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
              {...register('title')}
              label="Title"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              {...register('description')}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
            <RadioGroup
              name="privacy"
              value={privacy}
              onChange={handlePrivacyChange}
              row
            >
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
            </RadioGroup>
            <Button
              type="submit"
              variant="contained"
              className="color-green"
              style={{ marginRight: 10, marginTop: 10 }}
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add post'}
            </Button>
            <Button
              variant="contained"
              className="color-red"
              onClick={handleClose}
              style={{ marginTop: 10 }}
              disabled={isLoading}
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
