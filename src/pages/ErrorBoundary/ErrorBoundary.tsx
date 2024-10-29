import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { useSetDocumentTitle } from 'src/hooks';

export default function ErrorBoundary() {
  useSetDocumentTitle('Error');
  const error = useRouteError();
  // eslint-disable-next-line no-console
  console.error(error);

  return (
    <>
      <Typography component="h1" paragraph variant="h4">
        Error
      </Typography>

      <Alert severity="error">
        <AlertTitle>Unexpected Application Error</AlertTitle>
        <pre>
          <code>{String(error)}</code>
        </pre>
      </Alert>

      <br />

      <Typography paragraph>
        Refresh the page or go to{' '}
        <Link component={RouterLink} to="/">
          home
        </Link>
        .
      </Typography>
    </>
  );
}
