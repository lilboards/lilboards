import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { onConnected } from '../../firebase/database';
import Connection from './Connection';

jest.mock('../../firebase/database', () => ({
  onConnected: jest.fn(),
}));

const mockedOnConnected = jest.mocked(onConnected);

const message = 'Unable to connect to server. Realtime updates are paused.';

describe('connected', () => {
  beforeEach(() => {
    const isConnected = true;
    mockedOnConnected.mockImplementation((callback) => {
      callback(isConnected);
    });
  });

  it('does not render error', () => {
    render(<Connection />);
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});

describe('disconnected', () => {
  beforeEach(() => {
    const isConnected = false;
    mockedOnConnected.mockImplementation((callback) => {
      callback(isConnected);
    });
  });

  it('renders error when disconnected', () => {
    render(<Connection />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('closes snackbar when close icon button is clicked', async () => {
    render(<Connection />);
    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });
  });
});
