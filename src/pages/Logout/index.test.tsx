import { render, screen, waitFor } from '@testing-library/react';

import LogoutLoader from '.';

jest.mock('./Logout', () => () => <>Logout</>);

it('lazy loads Logout', async () => {
  render(<LogoutLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Logout')).toBeInTheDocument();
});
