import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import ListLoader from '.';

vi.mock('./List', () => ({
  default: () => <>List</>,
}));

it('lazy loads List', async () => {
  render(<ListLoader />);
  expect(screen.getByRole('progressbar')).toBeVisible();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('List')).toBeVisible();
});
