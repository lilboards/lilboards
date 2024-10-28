import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { onConnected } from 'src/firebase/database';

import Connection from './Connection';

jest.mock('src/firebase/database', () => ({
  onConnected: jest.fn(),
}));

const mockedOnConnected = jest.mocked(onConnected);

const message =
  'Unable to connect to the server. Real-time updates are paused.';

jest.useFakeTimers();

describe('connected', () => {
  beforeEach(() => {
    const isConnected = true;
    mockedOnConnected.mockImplementation((callback) => {
      callback(isConnected);
    });
  });

  it('does not render error', () => {
    render(<Connection />);
    jest.runAllTimers();
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
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('closes snackbar when close icon button is clicked', async () => {
    render(<Connection />);
    act(() => {
      jest.runAllTimers();
    });
    fireEvent.click(screen.getByLabelText('Close'));
    await waitFor(() => {
      expect(screen.queryByText(message)).not.toBeInTheDocument();
    });
  });
});
