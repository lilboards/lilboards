import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, getStoreState, updateStore } from '../../utils/test';
import { generateId, updateColumn } from '../../firebase';
import { COLUMN_TEST_ID as columnId } from '../../constants/test';
import BoardControls from './BoardControls';

jest.mock('../../firebase', () => ({
  generateId: jest.fn(),
  updateColumn: jest.fn(),
}));

beforeEach(() => {
  (generateId as jest.Mock).mockReturnValue(columnId);
  (updateColumn as jest.Mock).mockClear();
});

describe('add column', () => {
  it('renders "Add column" button', () => {
    const board = updateStore.withBoard();
    renderWithStore(<BoardControls boardId={board.id} />);
    expect(
      screen.getByRole('button', { name: 'Add column' })
    ).toBeInTheDocument();
  });

  it('saves new column to store', () => {
    const board = updateStore.withBoard();
    renderWithStore(<BoardControls boardId={board.id} />);
    expect(getStoreState().columns).toEqual({});
    fireEvent.click(screen.getByText('Add column'));
    expect(getStoreState().columns).toEqual({
      [columnId]: {
        created: expect.any(Number),
        name: '',
        updated: expect.any(Number),
      },
    });
  });

  it('saves new column to database', () => {
    const board = updateStore.withBoard();
    renderWithStore(<BoardControls boardId={board.id} />);
    fireEvent.click(screen.getByText('Add column'));
    expect(updateColumn).toBeCalledTimes(1);
    expect(updateColumn).toBeCalledWith(board.id, columnId, {
      created: expect.any(Number),
      name: '',
      updated: expect.any(Number),
    });
  });
});
