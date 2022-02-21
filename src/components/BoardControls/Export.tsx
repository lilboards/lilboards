import Button from '@mui/material/Button';

import { logEvent } from '../../firebase';
import { useSelector } from '../../hooks';
import { transformToMarkdown } from './utils';

export default function Export() {
  const columns = useSelector((state) => state.columns);
  const items = useSelector((state) => state.items);

  async function copyToClipboard() {
    const markdown = transformToMarkdown(columns, items);
    await navigator.clipboard.writeText(markdown);
    logEvent('export', { as: 'markdown' });
  }

  return (
    <Button
      color="info"
      onClick={copyToClipboard}
      variant="contained"
      sx={{ marginLeft: 2 }}
    >
      Export
    </Button>
  );
}
