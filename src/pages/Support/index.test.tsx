import { render, screen, waitFor } from '@testing-library/react';

import SupportLoader from '.';

jest.mock('./Support', () => () => <>Support</>);

it('lazy loads Support', async () => {
  render(<SupportLoader />);
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  expect(screen.getByText('Support')).toBeInTheDocument();
});
