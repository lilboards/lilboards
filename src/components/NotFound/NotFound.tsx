import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { RouteComponentProps } from '@reach/router';
import { Link as RouterLink } from '@reach/router';

export default function NotFound(props: RouteComponentProps) {
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
