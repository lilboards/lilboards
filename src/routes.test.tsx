import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchInlineSnapshot(`
    <Route
      element={<Layout />}
      path="/"
    >
      <Route
        element={<Home />}
        index={true}
      />
      <Route
        element={<Login />}
        path="/login"
      />
      <Route
        element={<Logout />}
        path="/logout"
      />
      <Route
        element={
          <Protected
            check="email"
          >
            <Boards />
          </Protected>
        }
        path="/boards"
      />
      <Route
        element={
          <Protected
            check="id"
            signInAnonymously={true}
          >
            <Board />
          </Protected>
        }
        path="/boards/:boardId"
      />
      <Route
        element={<NotFound />}
        path="*"
      />
    </Route>
  `);
});
