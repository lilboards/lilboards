import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import { Link as RouterLink } from '@reach/router';
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

          <Button
            color="inherit"
            component={RouterLink}
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
