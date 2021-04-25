import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box flexGrow={1}>
          <Typography variant="h6">Lilboards</Typography>
        </Box>

        <Button color="inherit" variant="outlined">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
