import { render, screen } from '@testing-library/react';
import Home from './Home';

it('renders header', () => {
  render(<Home />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
