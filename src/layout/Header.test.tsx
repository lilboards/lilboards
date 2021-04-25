import { render, screen } from '@testing-library/react';
import Header from './Header';

it('renders correctly', () => {
  const { container } = render(<Header />);
  expect(container).toMatchSnapshot();
});

it('renders header', () => {
  render(<Header />);
  const headerElement = screen.getByRole('banner');
  expect(headerElement).toBeInTheDocument();
  expect(headerElement).toHaveTextContent('Lilboards');
});

it('renders login button', () => {
  render(<Header />);
  expect(screen.getByText('Login')).toBeInTheDocument();
});
