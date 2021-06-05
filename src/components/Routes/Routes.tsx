import { Router } from '@reach/router';
import Boards from '../Boards';
import Home from '../Home';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';

export default function Routes() {
  return (
    <Router>
      <NotFound default />
      <Home path="/" />
      <Login path="/login" />
      <Logout path="/logout" />
      <Boards path="/boards" />
    </Router>
  );
}
