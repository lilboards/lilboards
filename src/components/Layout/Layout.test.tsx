import { renderWithProviders } from 'test/utils';
import { it } from 'vitest';

import Layout from './Layout';

it('renders without crashing', () => {
  renderWithProviders(<Layout />);
});
