import type { IconButtonProps } from '@material-ui/core/IconButton';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function CloseButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
}
