import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';

const withSnackbar = (WrappedComponent: any) => {
  return (props: any) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<SeverityType>('error');

    const showMessage: ShowNotification = (message = '', severity: SeverityType = 'error') => {
      setOpen(true);
      setSeverity(severity);
      setMessage(message);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    return (
      <>
        <WrappedComponent {...props} showNotification={showMessage} />
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          disableWindowBlurListener={true}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};

export default withSnackbar;

type SeverityType = 'success' | 'error' | 'warning' | 'info';

export type ShowNotification = (message: string, severity?: SeverityType) => void;
