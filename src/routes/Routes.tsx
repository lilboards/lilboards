import { Router } from '@reach/router';
import Home from '../home';

export default function Routes() {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
}
