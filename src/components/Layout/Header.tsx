import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Link as RouterLink } from '@reach/router';

import { REDIRECT_TO } from '../../constants';
import { useSelector } from '../../hooks';

export default function Header() {
  const isLoggedIn = useSelector((state) => Boolean(state.user.email));

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box flexGrow={1}>
            <Link color="inherit" component={RouterLink} to="/" variant="h6">
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
