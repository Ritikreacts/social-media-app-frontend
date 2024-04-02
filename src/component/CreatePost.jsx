import * as React from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

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
};

export default function CreatePost({ openProfile, setOpenProfile }) {
  console.log('hello from Create Post');
  const handleClose = () => setOpenProfile(false);
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
            placeat aspernatur unde veniam labore accusantium rerum, explicabo
            ex nemo voluptates quo dolores nisi, laboriosam dolore culpa debitis
            porro veritatis.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
CreatePost.propTypes = {
  openProfile: PropTypes.bool.isRequired,
  setOpenProfile: PropTypes.func.isRequired,
};
