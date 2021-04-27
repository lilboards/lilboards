import { Router } from '@reach/router';
import Home from '../home';
import Login from '../login';
import Boards from '../boards';

export default function Routes() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Boards path="/boards" />
    </Router>
  );
}
