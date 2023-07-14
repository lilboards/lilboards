import FileDownloadIcon from '@mui/icons-material/FileDownload';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { SxProps } from '@mui/system';
import { createSelector } from '@reduxjs/toolkit';

import { logEvent } from '../../firebase';
import { useSelector } from '../../hooks';
import type { RootState } from '../../types';
import { transformToMarkdown } from './utils';

const selectColumns = createSelector(
  (state: RootState) => state.columns,
  (columns) => columns,
);

interface Props {
  sx?: SxProps;
}

export default function Export(props: Props) {
  const columns = useSelector(selectColumns);
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
