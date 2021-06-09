import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { boardsRef } from '../../firebase';
import Board from './Board';

jest.mock('../../firebase', () => ({
  boardsRef: {
    child: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
  },
}));

beforeEach(() => {
  (boardsRef.child as jest.Mock).mockReturnThis();
});

it('render null when boardId is empty', () => {
  const { baseElement } = renderWithStore(<Board />);
  expect(baseElement.firstChild).toBeEmptyDOMElement();
});

it('render null when there are no boards', () => {
  const { baseElement } = renderWithStore(<Board boardId="board1" />);
  expect(baseElement.firstChild).toBeEmptyDOMElement();
});

it('renders heading', () => {
  const { id, name } = updateStore.withBoard();
  renderWithStore(<Board boardId={id} />);
  expect(screen.getByRole('heading', { level: 1 })).toBe(
    screen.getByText(name)
  );
});

describe('mount', () => {
  beforeAll(() => {
    const snapshot = {
      val: () => ({
        created: 0,
        name: 'Board Name',
        updated: 0,
      }),
    };
    (boardsRef.on as jest.Mock).mockImplementationOnce(
      (eventType, successCallback) =>
        eventType === 'value' && successCallback(snapshot)
    );
    renderWithStore(<Board boardId="board1" />);
  });

  it('loads board', () => {
    expect(screen.getByRole('heading', { level: 1 })).toBe(
      screen.getByText('Board Name')
    );
  });
});
