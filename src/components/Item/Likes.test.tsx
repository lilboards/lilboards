import { fireEvent, screen } from '@testing-library/react';
import { actions } from 'src/store';
import { boardId, itemId, userId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';
import { beforeEach, describe, expect, it } from 'vitest';

import Likes from './Likes';

const props = {
  boardId,
  itemId,
};

describe('without user and item', () => {
  it('renders like button', () => {
    renderWithProviders(<Likes boardId={boardId} itemId="" />);
    expect(screen.getByRole('button')).toBe(
      screen.getByLabelText('Like item ""'),
    );
  });

  it('renders like count', () => {
    renderWithProviders(<Likes boardId={boardId} itemId="" />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByLabelText(/0 likes/)).toBeInTheDocument();
  });
});

describe('with user and item', () => {
  let item: ReturnType<typeof updateStore.withItem>;

  beforeEach(() => {
    updateStore.withUser();
    item = updateStore.withItem();
  });

  it('increments like count on click', () => {
    renderWithProviders(<Likes {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(`Like item "${item.text}"`));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText(/1 like for item/)).toBeInTheDocument();
  });

  it('decrements like count on click', () => {
    renderWithProviders(<Likes {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(`Like item "${item.text}"`));
    fireEvent.click(screen.getByLabelText(`Unlike item "${item.text}"`));
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByLabelText(/0 likes for item/)).toBeInTheDocument();
  });
});

describe('with another user already liking an item', () => {
  let item: ReturnType<typeof updateStore.withItem>;

  beforeEach(() => {
    updateStore.withUser();
    item = updateStore.withItem();
    // A different user already likes a separate item on the board. This must
    // not poison totalLikes for the current user (regression: Number(undefined) => NaN).
    store.dispatch(
      actions.likeItem({
        boardId,
        itemId: `${itemId}_other`,
        userId: `${userId}_other`,
      }),
    );
  });

  it('allows current user to like an item when another user has already liked an item', () => {
    renderWithProviders(<Likes {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(`Like item "${item.text}"`));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText(/1 like for item/)).toBeInTheDocument();
  });
});
