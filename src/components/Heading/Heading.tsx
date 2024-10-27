import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { copyLinkToClipboard } from 'src/utils';

interface Props {
  children: string;
  link?: boolean;
}

export default function Heading(props: Props) {
  return (
    <Typography component="h1" gutterBottom variant="h4">
      {props.children}

      {props.link && (
        <Tooltip arrow placement="right" title="Copy link">
          <IconButton color="info" onClick={copyLinkToClipboard}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
      )}
    </Typography>
  );
}
