import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../test/utils';
import Lists from './Lists';

it('renders heading', () => {
  renderWithProviders(<Lists />);
  const heading = screen.getByRole('heading', { level: 1, name: 'Lists' });
  expect(heading).toBeInTheDocument();
});
