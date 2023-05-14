import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchInlineSnapshot(`
    <Route
      element={<Layout />}
      path="/"
    >
      <Route
        errorElement={<ErrorBoundary />}
      >
        <Route
          element={<HomeLoader />}
          index={true}
        />
        <Route
          element={<LoginLoader />}
          path="login"
        />
        <Route
          element={<LogoutLoader />}
          path="logout"
        />
        <Route
          element={<SupportLoader />}
          path="support"
        />
        <Route
          path="boards"
        >
          <Route
            element={
              <ProtectedLoader
                check="email"
              />
            }
          >
            <Route
              element={<BoardsLoader />}
              index={true}
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
              path=":boardId"
            />
          </Route>
        </Route>
        <Route
          element={<NotFoundLoader />}
          path="*"
        />
      </Route>
    </Route>
  `);
});
