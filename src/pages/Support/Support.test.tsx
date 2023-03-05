import { screen } from '@testing-library/react';

import { renderWithContext } from '../../utils/test';
import { sponsorLinks } from './constants';
import Support from './Support';

it('renders heading', () => {
  renderWithContext(<Support />);
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Support',
    })
  ).toBeInTheDocument();
});

it('renders GitHub issue link', () => {
  renderWithContext(<Support />);
  expect(
    screen.getByRole('link', {
      name: 'issue',
    })
  ).toHaveAttribute(
    'href',
    'https://github.com/lilboards/lilboards/issues/new/choose'
  );
});

it('renders GitHub discussion link', () => {
  renderWithContext(<Support />);
  expect(
    screen.getByRole('link', {
      name: 'discussion',
    })
  ).toHaveAttribute(
    'href',
    'https://github.com/lilboards/lilboards/discussions/new/choose'
  );
});

it.each(sponsorLinks)('renders sponsor link "$text"', ({ text, href }) => {
  renderWithContext(<Support />);
  expect(
    screen.getByRole('link', {
      name: text,
    })
  ).toHaveAttribute('href', href);
});
