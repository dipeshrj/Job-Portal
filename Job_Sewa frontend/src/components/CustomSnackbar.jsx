import { Alert, Snackbar } from '@mui/material';
import React from 'react'

const CustomSnackbar = (props) => {


    const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // setOpen(false);
  };
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={props.status} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
  )
}

export default CustomSnackbar