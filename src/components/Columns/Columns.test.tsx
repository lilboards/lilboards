import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { generateId, getColumnsRef, updateColumn } from '../../firebase';
import {
  BOARD_TEST_ID as boardId,
  COLUMN_TEST_ID as columnId,
} from '../../constants/test';
import Columns from './Columns';

jest.mock('../../firebase', () => ({
  generateId: jest.fn(),
  getColumnsRef: jest.fn(),
  updateColumn: jest.fn(),
}));

beforeEach(() => {
  (generateId as jest.Mock).mockReturnValue(columnId);
  (getColumnsRef as jest.Mock).mockReturnValueOnce({
    off: jest.fn(),
    on: jest.fn(),
  });
  (updateColumn as jest.Mock).mockClear();
});

it('renders nothing when there is no board', () => {
  const { baseElement } = renderWithStore(<Columns boardId="" />);
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders "Add column" button', () => {
  const board = updateStore.withBoard();
  renderWithStore(<Columns boardId={board.id} />);
  expect(screen.getByText('Add column')).toBeInTheDocument();
});

it('renders column', () => {
  const board = updateStore.withBoard();
  const column = updateStore.withColumn();
  renderWithStore(<Columns boardId={board.id} />);
  expect(screen.getByLabelText('Column Name')).toBe(
    screen.getByDisplayValue(column.name)
  );
});

describe('add column', () => {
  it('renders new column', () => {
    const board = updateStore.withBoard();
    renderWithStore(<Columns boardId={board.id} />);
    fireEvent.click(screen.getByText('Add column'));
    expect(screen.getByPlaceholderText('Column 1')).toBe(
      screen.getByLabelText('Column Name')
    );
  });

  it('focuses on new column', () => {
    const board = updateStore.withBoard();
    renderWithStore(<Columns boardId={board.id} />);
    fireEvent.click(screen.getByText('Add column'));
    expect(screen.getByPlaceholderText('Column 1')).toHaveFocus();
  });

  it('saves new column to database', () => {
    const board = updateStore.withBoard();
    renderWithStore(<Columns boardId={board.id} />);
    fireEvent.click(screen.getByText('Add column'));
    expect(updateColumn).toBeCalledTimes(1);
    expect(updateColumn).toBeCalledWith(board.id, columnId, {
      created: expect.any(Number),
      name: '',
      updated: expect.any(Number),
    });
  });
});

describe('mount', () => {
  beforeEach(async () => {
    const snapshot = {
      val: () => ({
        [columnId]: {
          created: 0,
          name: '',
          updated: 0,
        },
      }),
    };

    (getColumnsRef as jest.Mock).mockReset().mockReturnValueOnce({
      off: jest.fn(),
      on: jest.fn(
        (eventType, successCallback) =>
          eventType === 'value' && successCallback(snapshot)
      ),
    });
  });

  it('loads columns', async () => {
    renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findAllByRole('textbox')).toHaveLength(1);
  });

  it('renders default column name', async () => {
    renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findByPlaceholderText('Column 1')).toBeInTheDocument();
  });

  it('removes columns on unmount', async () => {
    const { unmount } = renderWithStore(<Columns boardId={boardId} />);
    expect(await screen.findAllByPlaceholderText('Column 1')).toHaveLength(1);
    unmount();
    expect(screen.queryAllByPlaceholderText('Column 1')).toHaveLength(0);
  });
});
