import GitHubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import { Link as RouterLink } from 'react-router-dom';

import { REDIRECT_TO } from '../../constants';
import { useSelector } from '../../hooks';

export default function Header() {
  const isLoggedIn = useSelector((state) => Boolean(state.user.email));

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              to="/"
              underline="hover"
              variant="h6"
            >
              Lilboards
            </Link>
          </Box>

          <Link
            aria-label="Open GitHub repository"
            color="inherit"
            component={IconButton}
            href="https://b.remarkabl.org/lilboards"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </Link>

          {isLoggedIn && (
            <Button color="inherit" component={RouterLink} to="/boards">
              Boards
            </Button>
          )}

          <Box marginLeft={1}>
            <Button
              color="inherit"
              component={RouterLink}
              state={{ [REDIRECT_TO]: window.location.pathname }}
              to={isLoggedIn ? '/logout' : '/login'}
              variant="outlined"
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
