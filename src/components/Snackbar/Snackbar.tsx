import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import type { SnackbarProps } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import type { SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';

interface Props extends SnackbarProps {
  lastOpened?: number;
}

const SIX_SECONDS = 6e3;

export default function SimpleSnackbar({
  anchorOrigin = {
    horizontal: 'center',
    vertical: 'top',
  },
  autoHideDuration = SIX_SECONDS,
  lastOpened,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (lastOpened) {
      setOpen(true);
      setTimeout(() => setOpen(false), autoHideDuration!);
    }
  }, [lastOpened, autoHideDuration]);

  function handleClose(event: Event | SyntheticEvent, reason?: string) {
    /* istanbul ignore else */
    if (reason !== 'clickaway') {
      setOpen(false);
    }
  }

  const action = (
    <IconButton
      size="small"
      aria-label="Close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      action={action}
      onClose={handleClose}
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      {...props}
    />
  );
}
