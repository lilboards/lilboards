import { render, screen } from '@testing-library/react';
import App from '.';

it('renders correctly', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

it('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
