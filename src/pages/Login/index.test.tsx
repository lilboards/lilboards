import { render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';

import LoginLoader from '.';

vi.mock('./Login', () => ({
  default: () => <>Login</>,
}));

it('lazy loads Login', async () => {
  render(<LoginLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Login')).toBeInTheDocument();
});
