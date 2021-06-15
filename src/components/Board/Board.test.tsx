import { fireEvent, screen } from '@testing-library/react';
import { renderWithStore, getStoreState, updateStore } from '../../utils/test';
import { getBoardRef } from '../../firebase';
import Board from './Board';

jest.mock('../../firebase', () => ({
  getBoardRef: jest.fn(),
}));

jest.mock('../Columns', () => () => <>Columns</>);

beforeEach(() => {
  const snapshot = { val: () => null };
  (getBoardRef as jest.Mock).mockReturnValueOnce({
    get: jest.fn().mockResolvedValueOnce(snapshot),
  });
});

it('renders nothing when there is no board id', async () => {
  const { baseElement } = renderWithStore(<Board />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders nothing when there is no board', async () => {
  const { baseElement } = renderWithStore(<Board boardId="board1" />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders board name as heading', async () => {
  const board = updateStore.withBoard();
  renderWithStore(<Board boardId={board.id} />);
  expect(await screen.findByRole('heading', { level: 1 })).toBe(
    await screen.findByText(board.name)
  );
});

it('renders columns', async () => {
  const { id } = updateStore.withBoard();
  renderWithStore(<Board boardId={id} />);
  expect(await screen.findByText('Columns')).toBeInTheDocument();
});

it('renders "Add column" button', async () => {
  const { id } = updateStore.withBoard();
  renderWithStore(<Board boardId={id} />);
  expect(await screen.findByLabelText('Add column')).toBeInTheDocument();
  expect(await screen.findByText('Add column')).toBeInTheDocument();
});

it('adds column', async () => {
  const { id } = updateStore.withBoard();
  renderWithStore(<Board boardId={id} />);
  fireEvent.click(await screen.findByText('Add column'));
  expect(Object.keys(getStoreState().columns)).toHaveLength(1);
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

    (getBoardRef as jest.Mock).mockReset().mockReturnValueOnce({
      get: jest.fn().mockResolvedValueOnce(snapshot),
    });
  });

  it('loads board', async () => {
    renderWithStore(<Board boardId="board1" />);
    expect(await screen.findByRole('heading', { level: 1 })).toBe(
      await screen.findByText('Board Name')
    );
  });
});
