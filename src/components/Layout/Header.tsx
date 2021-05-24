import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import { Link as RouterLink } from '@reach/router';

export default function Header() {
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
            to="/login"
            variant="outlined"
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
