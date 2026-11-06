import { screen } from '@testing-library/react';
import { boardId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';
import { beforeEach, expect, it, vi } from 'vitest';

import Columns from './Columns';
import { useColumns, useItems, useLikes } from './hooks';

vi.mock('./hooks');

const mockedUseColumns = vi.mocked(useColumns);
const mockedUseItems = vi.mocked(useItems);
const mockedUseLikes = vi.mocked(useLikes);

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
  ).toBeVisible();
});

it('uses hooks', () => {
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
  expect(screen.getByText(item.text)).toBeVisible();
});

it('renders liked item', () => {
  updateStore.withItem();
  updateStore.withLike();
  renderWithProviders(<Columns boardId={boardId} />);
  expect(screen.getByLabelText(/1 like for item/)).toBeVisible();
});
