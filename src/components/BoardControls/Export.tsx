import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

import { logEvent } from '../../firebase';
import { useSelector } from '../../hooks';
import { transformToMarkdown } from './utils';

export const TOOLTIP_TIMEOUT = 3000;

export default function Export() {
  const [open, setOpen] = useState(false);
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);

  async function copyToClipboard() {
    const markdown = transformToMarkdown(columns, items);
    await navigator.clipboard.writeText(markdown);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, TOOLTIP_TIMEOUT);
    logEvent('export', { as: 'markdown' });
  }

  return (
    <Tooltip arrow open={open} title="Copied Markdown">
      <Button color="info" onClick={copyToClipboard} variant="contained">
        Export
      </Button>
    </Tooltip>
  );
}
