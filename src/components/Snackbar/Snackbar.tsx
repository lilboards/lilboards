import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import type { SnackbarProps } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import type { FC, SyntheticEvent } from 'react';
import { useEffect, useState } from 'react';

interface Props extends SnackbarProps {
  lastOpened?: number;
}

const SimpleSnackbar: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const { lastOpened, ...snackbarProps } = props;

  useEffect(() => {
    if (lastOpened) {
      setOpen(true);
      setTimeout(() => setOpen(false), props.autoHideDuration!);
    }
  }, [lastOpened, props.autoHideDuration]);

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
      {...snackbarProps}
    />
  );
};

SimpleSnackbar.defaultProps = {
  anchorOrigin: {
    horizontal: 'center',
    vertical: 'top',
  },
  autoHideDuration: 6e3, // 6 seconds
};

export default SimpleSnackbar;
