import { render, screen } from '@testing-library/react';
import Home from './Home';

it('renders home', () => {
  render(<Home />);
  expect(
    screen.getByText('Create boards, columns, and items.')
  ).toBeInTheDocument();
});
