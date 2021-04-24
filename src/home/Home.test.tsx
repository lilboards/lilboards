import { render, screen } from '@testing-library/react';
import Home from './Home';

it('renders correctly', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});

it('renders home', () => {
  render(<Home />);
  const homeElement = screen.getByText(/home/i);
  expect(homeElement).toBeInTheDocument();
});
