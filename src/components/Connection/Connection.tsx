import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { onConnected } from 'src/firebase/database';

export default function Connection() {
  const [open, setOpen] = useState(true);
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // ensure app is loaded before checking Firebase connection
    setTimeout(() => {
      onConnected(setConnected);
    }, 1000);
  }, []);

  function handleClose(event?: React.SyntheticEvent | Event, reason?: string) {
    /* istanbul ignore if */
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
      open={open && !connected}
    >
      <Alert onClose={handleClose} severity="error">
        Unable to connect to the server. Real-time updates are paused.
      </Alert>
    </Snackbar>
  );
}
