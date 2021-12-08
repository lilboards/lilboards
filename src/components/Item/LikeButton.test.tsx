import { fireEvent, screen } from '@testing-library/react';

import { renderWithContext, updateStore } from '../../utils/test';
import LikeButton from './LikeButton';

describe('when maxLikes is 0', () => {
  beforeEach(() => {
    const board = updateStore.withBoard({ maxLikes: 0 });
    const item = updateStore.withItem();
    renderWithContext(<LikeButton boardId={board.id} itemId={item.id} />);
  });

  it('does not like item', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Like item' }));
    expect(screen.getByLabelText('Like item')).toBeInTheDocument();
  });
});

describe('when maxLikes is 1', () => {
  beforeEach(() => {
    const board = updateStore.withBoard({ maxLikes: 1 });
    const item = updateStore.withItem();
    renderWithContext(<LikeButton boardId={board.id} itemId={item.id} />);
  });

  it('likes item', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Like item' }));
    expect(screen.getByLabelText('Unlike item')).toBeInTheDocument();
  });
});
