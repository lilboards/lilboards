import { fireEvent, screen } from '@testing-library/react';
import { boardId, itemId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

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
