import { Router } from '@reach/router';
import Home from '../home';
import Login from '../login';

export default function Routes() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
    </Router>
  );
}
