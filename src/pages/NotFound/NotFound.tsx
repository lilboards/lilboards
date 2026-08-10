import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useSetDocumentTitle } from 'src/hooks';

export default function NotFound() {
  useSetDocumentTitle('Not Found');

  return (
    <>
      <Typography component="h1" gutterBottom variant="h4">
        Not Found
      </Typography>

      <Typography component="p" gutterBottom>
        Go{' '}
        <Link component={RouterLink} to="/">
          home
        </Link>
        .
      </Typography>
    </>
  );
}
