import { render, screen, waitFor } from '@testing-library/react';

import ListLoader from '.';

jest.mock('./List', () => () => <>List</>);

it('lazy loads List', async () => {
  render(<ListLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('List')).toBeInTheDocument();
});
