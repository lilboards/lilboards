import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { logEvent } from '../../firebase';
import { useSelector } from '../../hooks';
import { transformToMarkdown } from './utils';

export default function Export() {
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);

  async function copyBoardMarkdownToClipboard() {
    const markdown = transformToMarkdown(columns, items);
    await navigator.clipboard.writeText(markdown);
    logEvent('copy', { board: 'markdown' });
  }

  return (
    <Tooltip arrow title="Copy board as Markdown">
      <IconButton
        color="info"
        onClick={copyBoardMarkdownToClipboard}
        sx={{ marginLeft: 0.5 }}
      >
        <FileDownloadIcon />
      </IconButton>
    </Tooltip>
  );
}
