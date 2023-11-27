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
  expect(useColumns).toBeCalledTimes(1);
  expect(useColumns).toBeCalledWith(boardId);
  expect(useItems).toBeCalledTimes(1);
  expect(useItems).toBeCalledWith(boardId);
  expect(useLikes).toBeCalledTimes(1);
  expect(useLikes).toBeCalledWith(boardId);
});

it('renders item text', () => {
  const item = updateStore.withItem();
  renderWithProviders(<Columns boardId={boardId} />);
  expect(screen.getByDisplayValue(item.text)).toBeInTheDocument();
});

it('renders liked item', () => {
  updateStore.withItem();
  updateStore.withLike();
  renderWithProviders(<Columns boardId={boardId} />);
  expect(screen.getByLabelText(/1 like for item/)).toBeInTheDocument();
});
