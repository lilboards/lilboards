import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import BoardsLoader from '.';

vi.mock('./Boards', () => ({
  default: () => <>Boards</>,
}));

it('lazy loads Boards', async () => {
  render(<BoardsLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Boards')).toBeInTheDocument();
});
