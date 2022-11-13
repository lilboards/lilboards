import { Route } from 'react-router-dom';

import Layout from './components/Layout';
import Protected from './components/Protected';
import Board from './pages/Board';
import Boards from './pages/Boards';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

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
        <Protected check="id" signInAnonymously>
          <Board />
        </Protected>
      }
    />

    <Route path="*" element={<NotFound />} />
  </Route>
);

export default routes;
