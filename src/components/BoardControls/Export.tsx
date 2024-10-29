import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps } from '@mui/system';
import { logEvent } from 'src/firebase';
import { useSelector } from 'src/hooks';

import { transformToMarkdown } from './utils';

interface Props {
  sx?: SxProps;
}

export default function Export(props: Props) {
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);

  async function copyBoardMarkdownToClipboard() {
    const markdown = transformToMarkdown(columns, items);
    await navigator.clipboard.writeText(markdown);
    logEvent('copy', { board: 'markdown' });
  }

  return (
    <Tooltip arrow sx={props.sx} title="Copy board as Markdown">
      <IconButton color="info" onClick={copyBoardMarkdownToClipboard}>
        <FileDownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
