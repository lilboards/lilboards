import { Route } from 'react-router-dom';
import Layout from 'src/components/Layout';
import Protected from 'src/components/Protected';
import Board from 'src/pages/Board';
import Boards from 'src/pages/Boards';
import ErrorBoundary from 'src/pages/ErrorBoundary';
import Home from 'src/pages/Home';
import List from 'src/pages/List';
import Lists from 'src/pages/Lists';
import Login from 'src/pages/Login';
import Logout from 'src/pages/Logout';
import NotFound from 'src/pages/NotFound';
import Support from 'src/pages/Support';

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

        <Route element={<Protected check="id" signInAnonymously />}>
          <Route path=":listId" element={<List />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  </Route>
);

export default routes;
