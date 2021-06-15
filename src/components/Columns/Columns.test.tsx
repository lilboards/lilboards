import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { getColumnsRef } from '../../firebase';
import Columns from './Columns';

jest.mock('../../firebase', () => ({
  getColumnsRef: jest.fn(),
}));

beforeEach(() => {
  (getColumnsRef as jest.Mock).mockImplementationOnce(() => ({
    off: jest.fn(),
    on: jest.fn(),
  }));
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

    (getColumnsRef as jest.Mock).mockReset().mockImplementationOnce(() => ({
      off: jest.fn(),
      on: jest.fn(
        (eventType, successCallback) =>
          eventType === 'value' && successCallback(snapshot)
      ),
    }));
  });

  it('loads columns', async () => {
    renderWithStore(<Columns boardId="board1" />);
    expect(await screen.findAllByRole('heading', { level: 2 })).toHaveLength(1);
  });

  it('renders default column name', async () => {
    renderWithStore(<Columns boardId="board1" />);
    expect(await screen.findByText('Column 1')).toBeInTheDocument();
  });

  it('removes columns on unmount', async () => {
    const { unmount } = renderWithStore(<Columns boardId="board1" />);
    expect(await screen.findAllByText('Column 1')).toHaveLength(1);
    unmount();
    expect(screen.queryAllByText('Column 1')).toHaveLength(0);
  });
});
