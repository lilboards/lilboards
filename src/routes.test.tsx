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
          />
        }
      >
        <Route
          element={<BoardsLoader />}
          path="/boards"
        />
      </Route>
      <Route
        element={
          <ProtectedLoader
            check="id"
            signInAnonymously={true}
          />
        }
      >
        <Route
          element={<BoardLoader />}
          path="/boards/:boardId"
        />
      </Route>
      <Route
        element={<NotFoundLoader />}
        path="*"
      />
    </Route>
  `);
});
