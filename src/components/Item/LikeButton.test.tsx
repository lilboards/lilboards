import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders, updateStore } from 'test/utils';

import LikeButton from './LikeButton';

let board: ReturnType<typeof updateStore.withBoard>;
let item: ReturnType<typeof updateStore.withItem>;

describe('when maxLikes is 0', () => {
  beforeEach(() => {
    board = updateStore.withBoard({ maxLikes: 0 });
    item = updateStore.withItem();
  });

  it('does not like item', () => {
    renderWithProviders(<LikeButton boardId={board.id} itemId={item.id} />);
    fireEvent.click(
      screen.getByRole('button', { name: `Like item "${item.text}"` }),
    );
    expect(
      screen.getByLabelText(`Like item "${item.text}"`),
    ).toBeInTheDocument();
  });
});

describe('when maxLikes is 1', () => {
  beforeEach(() => {
    board = updateStore.withBoard({ maxLikes: 1 });
    item = updateStore.withItem();
  });

  it('likes item', () => {
    renderWithProviders(<LikeButton boardId={board.id} itemId={item.id} />);
    fireEvent.click(
      screen.getByRole('button', { name: `Like item "${item.text}"` }),
    );
    expect(
      screen.getByLabelText(`Unlike item "${item.text}"`),
    ).toBeInTheDocument();
  });
});
