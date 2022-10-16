import { Route, Routes as Router } from 'react-router-dom';

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
      <Route index element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/logout" element={<Logout />} />

      <Route
        path="/boards"
        element={
          <Protected check="email">
            <Boards />
          </Protected>
        }
      />

      <Route
        path="/boards/:boardId"
        element={
          <Protected signInAnonymously>
            <Board />
          </Protected>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Router>
  );
}
