import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useSetDocumentTitle } from 'src/hooks';

import { sponsorLinks } from './constants';

export default function Support() {
  useSetDocumentTitle('Support');

  return (
    <>
      <Typography component="h1" paragraph variant="h4">
        Support
      </Typography>

      <Typography paragraph>
        Have a question? Open an{' '}
        <Link
          href="https://github.com/lilboards/lilboards/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          issue
        </Link>{' '}
        or{' '}
        <Link
          href="https://github.com/lilboards/lilboards/discussions"
          target="_blank"
          rel="noopener noreferrer"
        >
          discussion
        </Link>
        .
      </Typography>

      <Typography paragraph component="section">
        Sponsor this project:
        <ul>
          {sponsorLinks.map(({ text, href }, index) => (
            <li key={index}>
              <Link href={href} target="_blank" rel="noopener noreferrer">
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </Typography>
    </>
  );
}
