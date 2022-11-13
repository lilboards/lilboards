import { render, screen, waitFor } from '@testing-library/react';

import HomeLoader from '.';

jest.mock('./Home', () => () => <>Home</>);

it('lazy loads Home', async () => {
  render(<HomeLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Home')).toBeInTheDocument();
});
