import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import ListsLoader from '.';

vi.mock('./Lists', () => ({
  default: () => <>Lists</>,
}));

it('lazy loads Lists', async () => {
  render(<ListsLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Lists')).toBeInTheDocument();
});
