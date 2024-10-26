import Typography from '@mui/material/Typography';

import { useSetDocumentTitle } from '../../hooks';

export default function Lists() {
  useSetDocumentTitle('Lists');

  return (
    <>
      <Typography component="h1" gutterBottom variant="h4">
        Lists
      </Typography>

      <Typography>Coming soon.</Typography>
    </>
  );
}
