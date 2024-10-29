import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { PROJECT_VERSION } from 'src/config';

export default function Footer() {
  return (
    <>
      <Divider sx={{ marginBottom: 2 }} />

      <Box
        component="footer"
        sx={{
          display: { sm: 'flex' },
          justifyContent: 'space-between',
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Typography paragraph>
          By{' '}
          <Link
            href="https://b.remarkabl.org/mark"
            target="_blank"
            rel="noopener noreferrer"
          >
            remarkablemark
          </Link>
          . Version{' '}
          <Link
            href={`https://github.com/lilboards/lilboards/releases/tag/v${PROJECT_VERSION}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {PROJECT_VERSION}
          </Link>
          .
        </Typography>

        <Typography paragraph>
          Copyright © {new Date().getFullYear()}. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}
