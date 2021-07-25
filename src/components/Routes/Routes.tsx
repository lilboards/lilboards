import { Router } from '@reach/router';

import Board from '../Board';
import Boards from '../Boards';
import Home from '../Home';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';
import Protected from './Protected';

export default function Routes() {
  return (
    <Router>
      <NotFound default />
      <Home path="/" />
      <Login path="/login" />
      <Logout path="/logout" />
      <Protected check="email" component={Boards} path="/boards" />
      <Protected component={Board} path="/boards/:boardId" signInAnonymously />
    </Router>
  );
}
