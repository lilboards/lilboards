import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from '@reach/router';
import type { RouteComponentProps } from '@reach/router';
import Layout from '../Layout';

export default function NotFound(props: RouteComponentProps) {
  return (
    <Layout>
      <Typography component="h1" paragraph variant="h4">
        Not Found
      </Typography>

      <Typography>
        Return to{' '}
        <Link component={RouterLink} to="/">
          home
        </Link>
        .
      </Typography>
    </Layout>
  );
}
