import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

it('renders not found', () => {
  render(<NotFound />);
  expect(screen.getByText('Not Found')).toBeInTheDocument();
});
