import { fireEvent, screen } from '@testing-library/react';
import { getListVal, getUserListsVal } from 'src/firebase';
import { List } from 'src/types';
import { listId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

import Lists from './Lists';

jest.mock('src/firebase', () => ({
  ...jest.requireActual('src/firebase'),
  getListVal: jest.fn(),
  getUserListsVal: jest.fn(),
  logEvent: jest.fn(),
}));

const mockedGetListVal = jest.mocked(getListVal);
const mockedGetUserListsVal = jest.mocked(getUserListsVal);

beforeEach(() => {
  jest.clearAllMocks();
  mockedGetListVal.mockResolvedValueOnce(null);
  mockedGetUserListsVal.mockResolvedValueOnce(null);
});

it('renders heading', () => {
  renderWithProviders(<Lists />);
  const heading = screen.getByRole('heading', { level: 1, name: 'Lists' });
  expect(heading).toBeInTheDocument();
});

describe('add list', () => {
  it('renders button', () => {
    renderWithProviders(<Lists />);
    expect(
      screen.getByRole('button', { name: 'Add list' }),
    ).toBeInTheDocument();
  });

  it('adds list', () => {
    updateStore.withUser();
    renderWithProviders(<Lists />);
    fireEvent.click(screen.getByText('Add list'));
    expect(screen.getAllByLabelText('List Name')).toHaveLength(1);
  });

  it('adds lists', () => {
    updateStore.withUser();
    renderWithProviders(<Lists />);
    const length = 2;
    Array.from({ length }, () => fireEvent.click(screen.getByText('Add list')));
    expect(screen.getAllByLabelText('List Name')).toHaveLength(length);
  });

  it('focuses on list', () => {
    updateStore.withUser();
    renderWithProviders(<Lists />);
    fireEvent.click(screen.getByText('Add list'));
    expect(screen.getByPlaceholderText('Untitled List')).toHaveFocus();
  });
});

describe('mount', () => {
  beforeEach(() => {
    mockedGetUserListsVal.mockReset().mockResolvedValueOnce({
      [`${listId}1`]: true,
      [`${listId}2`]: true,
      [`${listId}3`]: false,
    });

    mockedGetListVal
      .mockReset()
      .mockResolvedValueOnce({ name: 'List 1' } as List)
      .mockResolvedValueOnce({ name: 'List 2' } as List)
      .mockResolvedValueOnce(null);
  });

  it('loads lists', async () => {
    updateStore.withUser();
    renderWithProviders(<Lists />);
    const lists = await screen.findAllByLabelText('List Name');
    expect(lists).toHaveLength(2);
  });
});
