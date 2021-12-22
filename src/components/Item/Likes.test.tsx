import { fireEvent, screen } from '@testing-library/react';

import {
  BOARD_TEST_ID as boardId,
  ITEM_TEST_ID as itemId,
} from '../../constants/test';
import { renderWithContext, updateStore } from '../../utils/test';
import Likes from './Likes';

const props = {
  boardId,
  itemId,
};

describe('without user and item', () => {
  it('renders like button', () => {
    renderWithContext(<Likes boardId={boardId} itemId="" />);
    expect(screen.getByRole('button')).toBe(screen.getByLabelText(/Like item/));
  });

  it('renders like count', () => {
    renderWithContext(<Likes boardId={boardId} itemId="" />);
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
    renderWithContext(<Likes {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(/Like item/));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText(/1 like for item/)).toBeInTheDocument();
  });

  it('decrements like count on click', () => {
    renderWithContext(<Likes {...props} itemId={item.id} />);
    fireEvent.click(screen.getByLabelText(/Like item/));
    fireEvent.click(screen.getByLabelText(/Unlike item/));
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByLabelText(/0 likes for item/)).toBeInTheDocument();
  });
});
