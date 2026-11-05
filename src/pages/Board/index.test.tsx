import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import BoardLoader from '.';

vi.mock('./Board', () => ({
  default: () => <>Board</>,
}));

it('lazy loads Board', async () => {
  render(<BoardLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Board')).toBeInTheDocument();
});
