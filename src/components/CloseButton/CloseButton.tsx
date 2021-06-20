import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import type { IconButtonProps } from '@material-ui/core/IconButton';

export default function CloseButton(props: IconButtonProps) {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
}
