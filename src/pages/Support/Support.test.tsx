import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/utils';

import { sponsorLinks } from './constants';
import Support from './Support';

it('renders heading', () => {
  renderWithProviders(<Support />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Support',
    }),
  ).toBeInTheDocument();
});

it('renders GitHub issue link', () => {
  renderWithProviders(<Support />);
  expect(
    screen.getByRole('link', {
      name: 'issue',
    }),
  ).toHaveAttribute('href', 'https://github.com/lilboards/lilboards/issues');
});

it('renders GitHub discussion link', () => {
  renderWithProviders(<Support />);
  expect(
    screen.getByRole('link', {
      name: 'discussion',
    }),
  ).toHaveAttribute(
    'href',
    'https://github.com/lilboards/lilboards/discussions',
  );
});

it.each(sponsorLinks)('renders sponsor link "$text"', ({ text, href }) => {
  renderWithProviders(<Support />);
  expect(
    screen.getByRole('link', {
      name: text,
    }),
  ).toHaveAttribute('href', href);
});
