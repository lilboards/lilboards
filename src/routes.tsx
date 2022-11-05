import { Route } from 'react-router-dom';

import Board from './components/Board';
import Boards from './components/Boards';
import Home from './components/Home';
import Layout from './components/Layout';
import Login from './components/Login';
import Logout from './components/Logout';
import NotFound from './components/NotFound';
import Protected from './components/Protected';

const routes = (
  <Route path="/" element={<Layout />}>
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
  </Route>
);

export default routes;
