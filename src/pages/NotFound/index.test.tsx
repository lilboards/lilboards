import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import NotFoundLoader from '.';

vi.mock('./NotFound', () => ({
  default: () => <>NotFound</>,
}));

it('lazy loads NotFound', async () => {
  render(<NotFoundLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('NotFound')).toBeInTheDocument();
});
