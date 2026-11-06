import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import BoardControls from './BoardControls';

vi.mock('src/firebase');

it('does not throw error when board is invalid', () => {
  expect(() => {
    renderWithProviders(<BoardControls boardId="" />);
  }).not.toThrow();
});

describe('desktop', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('renders "Add column" button', () => {
    renderWithProviders(<BoardControls boardId={board.id} />);
    expect(screen.getByRole('button', { name: 'Add column' })).toBeVisible();
  });

  it('renders "Timer" input and "Start" button', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithProviders(<BoardControls boardId={board.id} />);
    expect(screen.getByLabelText('Timer in minutes')).toBeVisible();
    expect(screen.getByLabelText('Start timer')).toBeVisible();
  });

  it('renders "Hide Likes" switch', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithProviders(<BoardControls boardId={board.id} />);
    expect(screen.getByLabelText('Hide Likes')).toBeInTheDocument();
  });

  it('renders "Sort by likes" button', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithProviders(<BoardControls boardId={board.id} />);
    expect(screen.getByRole('button', { name: 'Sort by likes' })).toBeVisible();
  });

  it('renders copy board button', () => {
    const board = updateStore.withBoard();
    updateStore.withUser();
    renderWithProviders(<BoardControls boardId={board.id} />);
    expect(screen.getByLabelText('Copy board as Markdown')).toBe(
      screen.getByRole('button', { name: 'Copy board as Markdown' }),
    );
  });
});

describe('mobile', () => {
  let board: ReturnType<typeof updateStore.withBoard>;

  beforeEach(() => {
    board = updateStore.withBoard();
    updateStore.withUser();
  });

  it('toggles board controls', async () => {
    renderWithProviders(<BoardControls boardId={board.id} />);
    expect(screen.getAllByLabelText('Hide Likes')).toHaveLength(1);
    fireEvent.click(screen.getByLabelText('Board Controls'));
    expect(screen.getAllByLabelText('Hide Likes')).toHaveLength(2);
    fireEvent.click(
      screen.getByRole('presentation').firstChild as unknown as HTMLElement,
    );
    await waitFor(() => {
      expect(screen.getAllByLabelText('Hide Likes')).toHaveLength(1);
    });
  });
});
