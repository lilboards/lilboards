import { screen } from '@testing-library/react';
import { renderWithProviders } from 'test/utils';

import Breadcrumb from './Breadcrumb';

it('renders breadcrumb', () => {
  const name = 'Link';
  const href = '/link';
  renderWithProviders(<Breadcrumb to={href}>{name}</Breadcrumb>);
  expect(screen.getByRole('link', { name })).toHaveAttribute('href', href);
});
