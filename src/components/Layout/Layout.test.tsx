import { renderWithProviders } from '../../utils/test';
import Layout from './Layout';

it('renders without crashing', () => {
  renderWithProviders(<Layout />);
});
