import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Snackbar from './Snackbar';

const message = 'message';

it('does not render snackbar when props.open is false', () => {
  render(
    <Snackbar
      message={message}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    />,
  );
  expect(screen.queryByText(message)).not.toBeInTheDocument();
});

it('renders snackbar when props.open is true', () => {
  render(<Snackbar message={message} open />);
  expect(screen.getByText(message)).toBeInTheDocument();
});

it('closes snackbar when close icon button is clicked', async () => {
  render(<Snackbar lastOpened={Date.now()} message={message} />);
  fireEvent.click(screen.getByLabelText('Close'));
  await waitFor(() => {
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});

it('auto hides snackbar', async () => {
  render(
    <Snackbar autoHideDuration={0} lastOpened={Date.now()} message={message} />,
  );
  await waitFor(() => {
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});
