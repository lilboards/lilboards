import { render, screen, waitFor } from '@testing-library/react';

import ListsLoader from '.';

jest.mock('./Lists', () => () => <>Lists</>);

it('lazy loads Lists', async () => {
  render(<ListsLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Lists')).toBeInTheDocument();
});
