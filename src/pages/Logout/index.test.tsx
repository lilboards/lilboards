import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import LogoutLoader from '.';

vi.mock('./Logout', () => ({
  default: () => <>Logout</>,
}));

it('lazy loads Logout', async () => {
  render(<LogoutLoader />);
  expect(screen.getByRole('progressbar')).toBeVisible();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Logout')).toBeVisible();
});
