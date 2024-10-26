import { Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Protected from '../components/Protected';
import Board from '../pages/Board';
import Boards from '../pages/Boards';
import ErrorBoundary from '../pages/ErrorBoundary';
import Home from '../pages/Home';
import Lists from '../pages/Lists';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import NotFound from '../pages/NotFound';
import Support from '../pages/Support';

const routes = (
  <Route path="/" element={<Layout />}>
    <Route errorElement={<ErrorBoundary />}>
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

      <Route path="lists">
        <Route element={<Protected check="email" />}>
          <Route index element={<Lists />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default routes;
