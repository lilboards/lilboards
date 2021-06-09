import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import { boardsRef } from '../../firebase';
import Board from './Board';

jest.mock('../../firebase', () => ({
  boardsRef: {
    child: jest.fn(),
    once: jest.fn(),
    off: jest.fn(),
  },
}));

beforeEach(() => {
  const snapshot = { val: () => null };
  (boardsRef.once as jest.Mock).mockResolvedValue(snapshot);
  (boardsRef.child as jest.Mock).mockReturnThis();
});

it('renders nothing when there is no board id', () => {
  const { baseElement } = renderWithStore(<Board />);
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders nothing when there is no board', async () => {
  const { baseElement } = renderWithStore(<Board boardId="board1" />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders board name as heading', async () => {
  const { id, name } = updateStore.withBoard();
  renderWithStore(<Board boardId={id} />);
  expect(await screen.findByRole('heading', { level: 1 })).toBe(
    await screen.findByText(name)
  );
});

describe('mount', () => {
  beforeEach(async () => {
    const snapshot = {
      val: () => ({
        created: 0,
        name: 'Board Name',
        updated: 0,
      }),
    };
    (boardsRef.once as jest.Mock).mockResolvedValueOnce(snapshot);
  });

  it('loads board', async () => {
    renderWithStore(<Board boardId="board1" />);
    expect(await screen.findByRole('heading', { level: 1 })).toBe(
      await screen.findByText('Board Name')
    );
  });
});
