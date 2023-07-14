import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../utils/test';
import Home from './Home';

it('renders home', () => {
  renderWithProviders(<Home />);
  expect(
    screen.getByText('Create boards, columns, and items.'),
  ).toBeInTheDocument();
});

it('renders hero call-to-action', () => {
  renderWithProviders(<Home />);
  expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
    'href',
    '/boards',
  );
});

it('renders GitHub link', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText(/open source/i)).toHaveAttribute(
    'href',
    'https://b.remarkabl.org/lilboards',
  );
});

it('renders remarkablemark link', () => {
  renderWithProviders(<Home />);
  expect(screen.getByText('remarkablemark')).toHaveAttribute(
    'href',
    'https://b.remarkabl.org/mark',
  );
});

it('renders version link', () => {
  const version = process.env.REACT_APP_PROJECT_VERSION as string;
  renderWithProviders(<Home />);
  expect(screen.getByText(version)).toHaveAttribute(
    'href',
    `https://github.com/lilboards/lilboards/releases/tag/v${version}`,
  );
});
