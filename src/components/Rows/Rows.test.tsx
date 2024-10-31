import { screen } from '@testing-library/react';
import { listId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

import Rows from '.';
import { useItems, useRows } from './hooks';

jest.mock('./hooks', () => ({
  useRows: jest.fn(),
  useItems: jest.fn(),
}));

const mockedUseRows = jest.mocked(useRows);
const mockedUseItems = jest.mocked(useItems);

beforeEach(() => {
  mockedUseRows.mockClear();
  mockedUseItems.mockClear();
  updateStore.withRow();
});

it('renders row', () => {
  renderWithProviders(<Rows listId={listId} />);
  expect(
    screen.getByRole('heading', {
      level: 2,
      name: 'Row One',
    }),
  ).toBeInTheDocument();
});

it('uses hooks', async () => {
  renderWithProviders(<Rows listId={listId} />);
  expect(useRows).toHaveBeenCalledTimes(1);
  expect(useRows).toHaveBeenCalledWith(listId);
  expect(useItems).toHaveBeenCalledTimes(1);
  expect(useItems).toHaveBeenCalledWith(listId);
});

it('renders item text', () => {
  const item = updateStore.withListItem();
  renderWithProviders(<Rows listId={listId} />);
  expect(screen.getByText(item.text)).toBeInTheDocument();
});
