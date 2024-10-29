import { renderWithProviders } from 'test/utils';

import Layout from './Layout';

it('renders without crashing', () => {
  renderWithProviders(<Layout />);
});
