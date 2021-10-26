import IconButton from '@material-ui/core/IconButton';
import type { SnackbarProps } from '@material-ui/core/Snackbar';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
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

  function handleClose(event: SyntheticEvent, reason?: string) {
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
