import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';

import { useSetDocumentTitle } from '../../hooks';

export default function NotFound() {
  useSetDocumentTitle('404 Not Found');

  return (
    <>
      <Typography component="h1" paragraph variant="h4">
        Not Found
      </Typography>

      <Typography paragraph>
        Go to{' '}
        <Link component={RouterLink} to="/">
          home
        </Link>
        .
      </Typography>
    </>
  );
}
