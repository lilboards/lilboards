import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import type { SnackbarProps } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import { type SyntheticEvent, useCallback, useEffect, useState } from 'react';

interface Props extends SnackbarProps {
  lastOpened?: number;
}

const SIX_SECONDS = 6000;

export default function SimpleSnackbar({
  anchorOrigin = {
    horizontal: 'center',
    vertical: 'top',
  },
  autoHideDuration = SIX_SECONDS,
  lastOpened,
  open = false,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (lastOpened) {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), autoHideDuration!);
    }
  }, [lastOpened, autoHideDuration]);

  const handleClose = useCallback(
    (event: Event | SyntheticEvent, reason?: string) =>
      reason !== 'clickaway' && setIsOpen(false),
    [setIsOpen],
  );

  const action = (
    <IconButton
      aria-label="Close"
      color="inherit"
      onClick={handleClose}
      size="small"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      action={action}
      anchorOrigin={anchorOrigin}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      open={isOpen}
      {...props}
    />
  );
}
