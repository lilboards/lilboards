import CloseIcon from '@mui/icons-material/Close';
import type { IconButtonProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import type { SvgIconProps } from '@mui/material/SvgIcon';

interface Props extends IconButtonProps {
  svgIconProps?: SvgIconProps;
}

export default function CloseButton({
  svgIconProps,
  ...iconButtonProps
}: Props) {
  return (
    <IconButton size="large" {...iconButtonProps}>
      <CloseIcon {...svgIconProps} />
    </IconButton>
  );
}
