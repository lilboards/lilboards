import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
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
