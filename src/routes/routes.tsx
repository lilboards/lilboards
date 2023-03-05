import type { ReactElement } from 'react';
import { Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Protected from '../components/Protected';
import Board from '../pages/Board';
import Boards from '../pages/Boards';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import NotFound from '../pages/NotFound';
import Support from '../pages/Support';

const routes: ReactElement = (
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />

    <Route path="login" element={<Login />} />
    <Route path="logout" element={<Logout />} />
    <Route path="support" element={<Support />} />

    <Route path="boards">
      <Route element={<Protected check="email" />}>
        <Route index element={<Boards />} />
      </Route>

      <Route element={<Protected check="id" signInAnonymously />}>
        <Route path=":boardId" element={<Board />} />
      </Route>
    </Route>

    <Route path="*" element={<NotFound />} />
  </Route>
);

export default routes;
