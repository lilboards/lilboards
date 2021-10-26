import { render, screen } from '@testing-library/react';

import Home from './Home';

it('renders home', () => {
  render(<Home />);
  expect(
    screen.getByText('Create boards, columns, and items.')
  ).toBeInTheDocument();
});

it('renders GitHub link', () => {
  render(<Home />);
  expect(screen.getByText('open source')).toHaveAttribute(
    'href',
    'https://b.remarkabl.org/lilboards'
  );
});

it('renders remarkablemark link', () => {
  render(<Home />);
  expect(screen.getByText('remarkablemark')).toHaveAttribute(
    'href',
    'https://b.remarkabl.org/mark'
  );
});

it('renders version link', () => {
  const version = process.env.REACT_APP_PROJECT_VERSION as string;
  render(<Home />);
  expect(screen.getByText(version)).toHaveAttribute(
    'href',
    `https://github.com/lilboards/lilboards/releases/tag/v${version}`
  );
});
