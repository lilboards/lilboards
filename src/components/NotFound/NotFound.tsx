import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { RouteComponentProps } from '@reach/router';
import { Link as RouterLink } from '@reach/router';

import { useSetDocumentTitle } from '../../hooks';

export default function NotFound(props: RouteComponentProps) {
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
