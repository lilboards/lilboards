import { screen } from '@testing-library/react';

import Board from './Board';

import { BOARD_TEST_ID } from '../../constants/test';
import { getBoardVal } from '../../firebase';
import { renderWithStore, updateStore } from '../../utils/test';

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
  const { baseElement } = renderWithStore(<Board boardId={BOARD_TEST_ID} />);
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
  const board = updateStore.withBoard();
  renderWithStore(<Board boardId={board.id} />);
  expect(await screen.findByText('Columns')).toBeInTheDocument();
});

describe('mount', () => {
  beforeEach(async () => {
    (getBoardVal as jest.Mock).mockReset().mockResolvedValueOnce({
      created: 0,
      name: 'Board Name',
      updated: 0,
    });
  });

  it('loads board', async () => {
    renderWithStore(<Board boardId={BOARD_TEST_ID} />);
    expect(await screen.findByRole('heading', { level: 1 })).toBe(
      await screen.findByText('Board Name')
    );
  });
});
