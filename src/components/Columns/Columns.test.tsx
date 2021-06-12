import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { boardsRef } from '../../firebase';
import Columns from './Columns';

jest.mock('../../firebase', () => ({
  boardsRef: {
    child: jest.fn(),
    off: jest.fn(),
    on: jest.fn(),
  },
}));

beforeEach(() => {
  (boardsRef.child as jest.Mock).mockReturnThis();
});

it('renders nothing when there is no board id', () => {
  const { baseElement } = renderWithStore(<Columns boardId="" />);
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders nothing when there are no columns', () => {
  const board = updateStore.withBoard();
  const { baseElement } = renderWithStore(<Columns boardId={board.id} />);
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders column name', () => {
  const { board, columns } = updateStore.withBoardAndColumns();
  renderWithStore(<Columns boardId={board.id} />);
  expect(screen.getByRole('heading', { level: 2 })).toBe(
    screen.getByText(columns.column1.name)
  );
});

describe('mount', () => {
  beforeEach(async () => {
    const snapshot = {
      val: () => ({
        column_id: {
          created: 0,
          name: '',
          updated: 0,
        },
      }),
    };
    (boardsRef.on as jest.Mock).mockImplementationOnce(
      (eventType, successCallback) =>
        eventType === 'value' && successCallback(snapshot)
    );
  });

  it('loads columns', async () => {
    renderWithStore(<Columns boardId="board1" />);
    expect(await screen.findAllByRole('heading', { level: 2 })).toHaveLength(1);
  });

  it('renders default column name', async () => {
    renderWithStore(<Columns boardId="board1" />);
    expect(await screen.findByText('Column 1')).toBeInTheDocument();
  });
});
