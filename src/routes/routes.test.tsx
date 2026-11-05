import { expect, it } from 'vitest';

import routes from './routes';

it('matches snapshot', () => {
  expect(routes).toMatchSnapshot();
});
