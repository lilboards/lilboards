import { render, screen, waitFor } from '@testing-library/react';

import ProtectedLoader from '.';

jest.mock('./Protected', () => () => <>Protected</>);

it('lazy loads Protected', async () => {
  render(<ProtectedLoader check="email" />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Protected')).toBeInTheDocument();
});
