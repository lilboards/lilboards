import { Router } from '@reach/router';
import Home from '../Home';
import Login from '../Login';
import Boards from '../Boards';

export default function Routes() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Boards path="/boards" />
    </Router>
  );
}
