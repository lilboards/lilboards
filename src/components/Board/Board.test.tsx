import { screen } from '@testing-library/react';
import { BOARD_TEST_ID as boardId } from '../../constants/test';
import { getBoardVal } from '../../firebase';
import { renderWithStore, updateStore } from '../../utils/test';
import Board from './Board';

jest.mock('../../firebase', () => ({
  getBoardVal: jest.fn(),
}));

jest.mock('../Columns', () => () => <>Columns</>);

beforeEach(() => {
  (getBoardVal as jest.Mock).mockResolvedValueOnce(null);
});

it('renders nothing when there is no board id', async () => {
  const { baseElement } = renderWithStore(<Board />);
  await screen.findAllByText('');
  expect(baseElement.firstElementChild).toBeEmptyDOMElement();
});

it('renders nothing when there is no board', async () => {
  const { baseElement } = renderWithStore(<Board boardId={boardId} />);
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

it('renders "Add column" button', () => {
  updateStore.withUser();
  const board = updateStore.withBoard();
  renderWithStore(<Board boardId={board.id} />);
  expect(
    screen.getByRole('button', { name: 'Add column' })
  ).toBeInTheDocument();
});

it('renders columns', async () => {
  const board = updateStore.withBoard();
  renderWithStore(<Board boardId={board.id} />);
  expect(await screen.findByText('Columns')).toBeInTheDocument();
});

describe('with board and anonymous user', () => {
  const board = {
    createdAt: Date.now(),
    name: 'My Board',
    updatedAt: Date.now(),
  };

  beforeEach(() => {
    (getBoardVal as jest.Mock).mockReset().mockResolvedValueOnce(board);
  });

  it('loads board', async () => {
    renderWithStore(<Board boardId={boardId} />);
    const heading = await screen.findByRole('heading', {
      level: 1,
      name: board.name,
    });
    expect(heading).toBeInTheDocument();
  });
});
