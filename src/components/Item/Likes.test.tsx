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
  beforeEach(() => {
    renderWithContext(<Likes boardId={boardId} itemId="" />);
  });

  it('renders like button', () => {
    expect(screen.getByRole('button')).toBe(screen.getByLabelText(/Like item/));
  });

  it('renders like count', () => {
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByLabelText(/0 likes/)).toBeInTheDocument();
  });
});

describe('with user and item', () => {
  beforeEach(() => {
    updateStore.withUser();
    const item = updateStore.withItem();
    renderWithContext(<Likes {...props} itemId={item.id} />);
  });

  it('increments like count on click', () => {
    fireEvent.click(screen.getByLabelText(/Like item/));
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText(/1 like for item/)).toBeInTheDocument();
  });

  it('decrements like count on click', () => {
    fireEvent.click(screen.getByLabelText(/Like item/));
    fireEvent.click(screen.getByLabelText(/Unlike item/));
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByLabelText(/0 likes for item/)).toBeInTheDocument();
  });
});
