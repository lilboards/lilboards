import { renderWithContext } from '../../utils/test';
import Layout from './Layout';

it('renders without crashing', () => {
  renderWithContext(<Layout />);
});
