import { render, screen, waitFor } from '@testing-library/react';

import BoardsLoader from '.';

jest.mock('./Boards', () => () => <>Boards</>);

it('lazy loads Boards', async () => {
  render(<BoardsLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Boards')).toBeInTheDocument();
});
