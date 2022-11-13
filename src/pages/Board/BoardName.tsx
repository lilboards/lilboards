import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { logEvent } from '../../firebase';

interface Props {
  name: string;
}

export default function BoardName(props: Props) {
  return (
    <Typography component="h1" gutterBottom variant="h4">
      {props.name}

      <Tooltip arrow placement="right" title="Copy board link">
        <IconButton color="info" onClick={copyBoardLinkToClipboard}>
          <LinkIcon />
        </IconButton>
      </Tooltip>
    </Typography>
  );
}

async function copyBoardLinkToClipboard() {
  const boardLink = window.location.origin + window.location.pathname;
  await navigator.clipboard.writeText(boardLink);
  logEvent('copy', { link: boardLink });
}
