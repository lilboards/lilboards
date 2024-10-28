import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useSetDocumentTitle } from 'src/hooks';

export default function NotFound() {
  useSetDocumentTitle('Not Found');

  return (
    <>
      <Typography component="h1" paragraph variant="h4">
        Not Found
      </Typography>

      <Typography paragraph>
        Go{' '}
        <Link component={RouterLink} to="/">
          home
        </Link>
        .
      </Typography>
    </>
  );
}
