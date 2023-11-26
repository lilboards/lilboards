import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchSnapshot();
});
