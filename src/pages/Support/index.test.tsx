import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import SupportLoader from '.';

vi.mock('./Support', () => ({
  default: () => <>Support</>,
}));

it('lazy loads Support', async () => {
  render(<SupportLoader />);
  expect(screen.getByRole('progressbar')).toBeVisible();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Support')).toBeVisible();
});
