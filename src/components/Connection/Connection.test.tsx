import { act, fireEvent, render, screen } from '@testing-library/react';
import { onConnected } from 'src/firebase/database';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Connection from './Connection';

vi.mock('src/firebase/database');

const mockedOnConnected = vi.mocked(onConnected);

const message =
  'Unable to connect to the server. Real-time updates are paused.';

vi.useFakeTimers();

describe('connected', () => {
  beforeEach(() => {
    const isConnected = true;
    mockedOnConnected.mockImplementation((callback) => {
      callback(isConnected);
    });
  });

  it('does not render error', () => {
    render(<Connection />);
    vi.runAllTimers();
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
      vi.runAllTimers();
    });
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('closes snackbar when close icon button is clicked', () => {
    render(<Connection />);
    act(() => {
      vi.runAllTimers();
    });
    fireEvent.click(screen.getByLabelText('Close'));
    act(() => {
      vi.runAllTimers();
    });
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });
});
