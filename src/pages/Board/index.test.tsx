import { render, screen, waitFor } from '@testing-library/react';

import BoardLoader from '.';

jest.mock('./Board', () => () => <>Board</>);

it('lazy loads Board', async () => {
  render(<BoardLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Board')).toBeInTheDocument();
});
