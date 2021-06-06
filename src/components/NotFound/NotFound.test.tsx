import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import NotFound from './NotFound';

it('renders not found', () => {
  renderWithStore(<NotFound />);
  expect(screen.getByText('Not Found')).toBeInTheDocument();
});
