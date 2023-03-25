import CloseIcon from '@mui/icons-material/Close';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';

export default function CloseButton(props: IconButtonProps) {
  return (
    <IconButton size="large" {...props}>
      <CloseIcon />
    </IconButton>
  );
}
