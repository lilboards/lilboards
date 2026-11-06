import { screen } from '@testing-library/react';
import { listId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';
import { beforeEach, expect, it, vi } from 'vitest';

import Rows from '.';
import { useItems, useRows } from './hooks';

vi.mock('./hooks');

const mockedUseRows = vi.mocked(useRows);
const mockedUseItems = vi.mocked(useItems);

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
  ).toBeVisible();
});

it('uses hooks', () => {
  renderWithProviders(<Rows listId={listId} />);
  expect(useRows).toHaveBeenCalledTimes(1);
  expect(useRows).toHaveBeenCalledWith(listId);
  expect(useItems).toHaveBeenCalledTimes(1);
  expect(useItems).toHaveBeenCalledWith(listId);
});

it('renders item text', () => {
  const item = updateStore.withListItem();
  renderWithProviders(<Rows listId={listId} />);
  expect(screen.getByText(item.text)).toBeVisible();
});
