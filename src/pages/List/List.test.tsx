import { screen, waitFor } from '@testing-library/react';
import type { DatabaseReference, DataSnapshot } from 'firebase/database';
import { onValue } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { getListDataRef } from 'src/firebase';
import { List as ListType } from 'src/types';
import { listId, userId } from 'test/constants';
import { renderWithProviders, router, updateStore } from 'test/utils';

import List from './List';

const mockedOnValue = jest.mocked(onValue);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockedUseParams = jest.mocked(useParams);

jest.mock('src/firebase', () => ({
  getListDataRef: jest.fn(),
}));

const mockedGetListDataRef = jest.mocked(getListDataRef);

const mockRows = 'Rows';
const unsubscribe = jest.fn();

jest.mock('src/components/Rows', () => () => <p>{mockRows}</p>);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('no list', () => {
  beforeEach(() => {
    mockedOnValue.mockImplementationOnce((query, callback) => {
      callback({ val: () => null } as DataSnapshot);
      return unsubscribe;
    });
  });

  it('renders nothing when there is no list id', async () => {
    mockedUseParams.mockReturnValue({});
    renderWithProviders(<List />);
    await waitFor(() => expect(screen.queryByText(mockRows)).toBe(null));
  });

  it('renders nothing when there is no list', async () => {
    mockedUseParams.mockReturnValue({ listId: 'invalid' });
    renderWithProviders(<List />);
    await waitFor(() => expect(screen.queryByText(mockRows)).toBe(null));
  });

  it('redirects to "/404" when list is not found', async () => {
    mockedUseParams.mockReturnValue({ listId: 'invalid' });
    renderWithProviders(<List />);
    await waitFor(() => expect(router.state.location.pathname).toBe('/404'));
  });
});

describe('with list', () => {
  beforeEach(() => {
    const list = updateStore.withList();
    mockedUseParams.mockReturnValue({ listId: list.id });
    mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
      callback({ val: () => list } as DataSnapshot);
      return unsubscribe;
    });
  });

  describe('breadcrumbs', () => {
    it('does not render link when logged out', () => {
      renderWithProviders(<List />);
      expect(
        screen.queryByRole('link', { name: 'Lists' }),
      ).not.toBeInTheDocument();
    });

    it('renders link when logged in', () => {
      updateStore.withUser();
      renderWithProviders(<List />);
      expect(screen.getByRole('link', { name: 'Lists' })).toHaveAttribute(
        'href',
        '/lists',
      );
    });
  });

  describe('list name', () => {
    it('does not render list name as heading', () => {
      const list = updateStore.withList({ name: '' });
      mockedUseParams.mockReturnValue({ listId: list.id });
      mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
        callback({ val: () => list } as DataSnapshot);
        return unsubscribe;
      });
      renderWithProviders(<List />);
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('');
    });

    it('renders list name as heading', () => {
      const list = updateStore.withList();
      mockedUseParams.mockReturnValue({ listId: list.id });
      mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
        callback({ val: () => list } as DataSnapshot);
        return unsubscribe;
      });
      renderWithProviders(<List />);
      expect(screen.getByRole('heading', { level: 1 })).toBe(
        screen.getByText(list.name),
      );
    });
  });

  it('renders <Rows>', () => {
    renderWithProviders(<List />);
    expect(screen.getByText(mockRows)).toBeInTheDocument();
  });
});

describe('with list and anonymous user', () => {
  const list: ListType = {
    createdAt: Date.now(),
    createdBy: userId,
    name: 'List Name',
    updatedAt: Date.now(),
  };
  const listDataRef = 'listDataRef';

  beforeEach(() => {
    mockedGetListDataRef.mockReturnValueOnce(
      listDataRef as unknown as DatabaseReference,
    );
    mockedOnValue.mockReset().mockImplementationOnce((query, callback) => {
      callback({ val: (): ListType => list } as DataSnapshot);
      return unsubscribe;
    });
  });

  it('loads list', async () => {
    mockedUseParams.mockReturnValue({ listId });
    renderWithProviders(<List />);
    const heading = await screen.findByRole('heading', {
      level: 1,
      name: list.name,
    });
    expect(heading).toBeInTheDocument();
  });

  it('attaches ref listeners', () => {
    mockedUseParams.mockReturnValue({ listId });
    const { unmount } = renderWithProviders(<List />);
    expect(getListDataRef).toHaveBeenCalledTimes(1);
    expect(getListDataRef).toHaveBeenCalledWith(listId);
    expect(onValue).toHaveBeenCalledTimes(1);
    expect(onValue).toHaveBeenCalledWith(listDataRef, expect.any(Function));

    unmount();
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
