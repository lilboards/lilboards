import { render, screen } from '@testing-library/react';
import Login from './Login';

it('renders login', () => {
  render(<Login />);
  expect(screen.getByText('Sign In')).toBeInTheDocument();
});
