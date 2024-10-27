import { screen } from '@testing-library/react';

import { BOARD_TEST_ID as boardId } from '../../../test/constants';
import { renderWithProviders, updateStore } from '../../../test/utils';
import Columns from './Columns';
import { useColumns, useItems, useLikes } from './hooks';

jest.mock('./hooks', () => ({
  useColumns: jest.fn(),
  useItems: jest.fn(),
  useLikes: jest.fn(),
}));

const mockedUseColumns = jest.mocked(useColumns);
const mockedUseItems = jest.mocked(useItems);
const mockedUseLikes = jest.mocked(useLikes);

beforeEach(() => {
  mockedUseColumns.mockClear();
  mockedUseItems.mockClear();
  mockedUseLikes.mockClear();
  updateStore.withColumn();
});

it('renders column', () => {
  renderWithProviders(<Columns boardId={boardId} />);
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: 'Column One',
    }),
  ).toBeInTheDocument();
});

it('uses hooks', async () => {
  renderWithProviders(<Columns boardId={boardId} />);
  expect(useColumns).toHaveBeenCalledTimes(1);
  expect(useColumns).toHaveBeenCalledWith(boardId);
  expect(useItems).toHaveBeenCalledTimes(1);
  expect(useItems).toHaveBeenCalledWith(boardId);
  expect(useLikes).toHaveBeenCalledTimes(1);
  expect(useLikes).toHaveBeenCalledWith(boardId);
});

it('renders item text', () => {
  const item = updateStore.withItem();
  renderWithProviders(<Columns boardId={boardId} />);
  expect(screen.getByText(item.text)).toBeInTheDocument();
});

it('renders liked item', () => {
  updateStore.withItem();
  updateStore.withLike();
  renderWithProviders(<Columns boardId={boardId} />);
  expect(screen.getByLabelText(/1 like for item/)).toBeInTheDocument();
});
