import { Router } from '@reach/router';
import Board from '../Board';
import Boards from '../Boards';
import Home from '../Home';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';
import ProtectedRoute from './ProtectedRoute';

export default function Routes() {
  return (
    <Router>
      <NotFound default />
      <Home path="/" />
      <Login path="/login" />
      <Logout path="/logout" />
      <ProtectedRoute component={Boards} path="/boards" />
      <Board path="/boards/:boardId" />
    </Router>
  );
}
