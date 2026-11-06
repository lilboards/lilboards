import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import ProtectedLoader from '.';

vi.mock('./Protected', () => ({
  default: () => <>Protected</>,
}));

it('lazy loads Protected', async () => {
  render(<ProtectedLoader check="email" />);
  expect(screen.getByRole('progressbar')).toBeVisible();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Protected')).toBeVisible();
});
