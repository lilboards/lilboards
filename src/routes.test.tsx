import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchInlineSnapshot(`
    <Route
      element={<Layout />}
      path="/"
    >
      <Route
        element={<HomeLoader />}
        index={true}
      />
      <Route
        element={<LoginLoader />}
        path="/login"
      />
      <Route
        element={<LogoutLoader />}
        path="/logout"
      />
      <Route
        element={
          <ProtectedLoader
            check="email"
          >
            <BoardsLoader />
          </ProtectedLoader>
        }
        path="/boards"
      />
      <Route
        element={
          <ProtectedLoader
            check="id"
            signInAnonymously={true}
          >
            <BoardLoader />
          </ProtectedLoader>
        }
        path="/boards/:boardId"
      />
      <Route
        element={<NotFoundLoader />}
        path="*"
      />
    </Route>
  `);
});
