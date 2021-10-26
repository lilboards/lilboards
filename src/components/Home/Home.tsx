import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

const version = process.env.REACT_APP_PROJECT_VERSION;

export default function Home(props: RouteComponentProps) {
  return (
    <>
      <Typography paragraph>Create boards, columns, and items.</Typography>

      <Typography paragraph>
        Free and{' '}
        <Link
          href="https://b.remarkabl.org/lilboards"
          target="_blank"
          rel="noopener noreferrer"
        >
          open source
        </Link>
        . Built by{' '}
        <Link
          href="https://b.remarkabl.org/mark"
          target="_blank"
          rel="noopener noreferrer"
        >
          remarkablemark
        </Link>
        . Version{' '}
        <Link
          href={`https://github.com/lilboards/lilboards/releases/tag/v${version}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {version}
        </Link>
        .
      </Typography>
    </>
  );
}
