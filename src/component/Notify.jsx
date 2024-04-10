import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { closeSnackbar, useSnackbar } from 'notistack';

export const useSnackbarUtils = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (message, options) => {
    const { action, ...otherOptions } = options || {};
    const key = enqueueSnackbar(message, {
      autoHideDuration: 1500,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      },
      action: (key) => (
        <CloseIcon
          onClick={() => {
            closeSnackbar(key);
          }}
          style={{ cursor: 'pointer' }}
        />
      ),
      ...otherOptions,
    });

    return key;
  };

  const showSuccessSnackbar = (message, options) => {
    return showSnackbar(message, {
      variant: 'success',
      ...options,
    });
  };

  const showErrorSnackbar = (message, options) => {
    return showSnackbar(message, {
      variant: 'error',
      ...options,
    });
  };

  return {
    showSnackbar,
    showSuccessSnackbar,
    showErrorSnackbar,
  };
};
