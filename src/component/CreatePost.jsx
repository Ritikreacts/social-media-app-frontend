import React, { useRef } from 'react';

import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  Avatar,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit } = useForm();
  const fileInputRef = useRef();

  const handleClose = () => setOpenProfile(false);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (data) => {
    console.log(data); // Here you can handle the submitted data
    setOpenProfile(false); // Close the modal after submitting
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
              {...register('image')}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
            />
            <div onClick={handleImageClick} style={{ marginBottom: 20 }}>
              <Avatar
                variant="rounded"
                style={{
                  width: 200,
                  height: 200,
                  cursor: 'pointer',
                  margin: 'auto',
                }}
              >
                Add Photo
              </Avatar>
            </div>
            <TextField
              {...register('title')}
              label="Title"
              fullWidth
              margin="normal"
            />
            <TextField
              {...register('description')}
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
            >
              Submit
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
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
