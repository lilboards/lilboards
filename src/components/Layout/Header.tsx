import GitHubIcon from '@mui/icons-material/GitHub';
import HelpIcon from '@mui/icons-material/Help';
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
          {/* flexGrow is on Box so Link does not take full width */}
          <Box sx={{ flexGrow: 1 }}>
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

          {isLoggedIn && (
            <Button color="inherit" component={RouterLink} to="/boards">
              Boards
            </Button>
          )}

          {isLoggedIn && (
            <Button color="inherit" component={RouterLink} to="/lists">
              Lists
            </Button>
          )}

          <IconButton
            aria-label="Support"
            color="inherit"
            component={RouterLink}
            to="/support"
            title="Support"
          >
            <HelpIcon />
          </IconButton>

          <IconButton
            aria-label="GitHub"
            color="inherit"
            component={Link}
            href="https://b.remarkabl.org/lilboards"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <GitHubIcon />
          </IconButton>

          <Button
            color="inherit"
            component={RouterLink}
            state={{ [REDIRECT_TO]: window.location.pathname }}
            sx={{ marginLeft: 1 }}
            to={isLoggedIn ? '/logout' : '/login'}
            variant="outlined"
          >
            {isLoggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
