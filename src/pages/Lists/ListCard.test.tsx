import { fireEvent, screen } from '@testing-library/react';
import { DATE_NOW as dateNow, LIST_TEST_ID as listId } from 'test/constants';
import { renderWithProviders, store, updateStore } from 'test/utils';

import ListCard from './ListCard';

it('renders "Open list" link', () => {
  const list = updateStore.withList();
  renderWithProviders(<ListCard listId={list.id} />);
  expect(screen.getByRole('link', { name: 'Open list' })).toHaveAttribute(
    'href',
    `/lists/${listId}`,
  );
});

describe('edit list', () => {
  let list: ReturnType<typeof updateStore.withList>;

  beforeEach(() => {
    list = updateStore.withList();
  });

  it('sets user editing listId when input is focused', () => {
    renderWithProviders(<ListCard listId={list.id} />);
    fireEvent.focus(screen.getByPlaceholderText('Untitled List'));
    expect(store.getState().user.editing.listId).toBe(list.id);
  });

  it('edits and saves list name on change', async () => {
    updateStore.withUser();
    renderWithProviders(<ListCard listId={list.id} />);
    const dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(dateNow);
    const event = { target: { value: 'My List Name' } };
    fireEvent.change(screen.getByLabelText('List Name'), event);
    expect(store.getState().lists).toEqual({
      list_test_id: {
        createdAt: 1234567890,
        createdBy: 'user_test_id',
        name: 'My List Name',
        updatedAt: 1234567890,
        updatedBy: 'user_test_id',
      },
    });
    dateNowSpy.mockRestore();
  });

  it('resets user editing listId on blur', () => {
    renderWithProviders(<ListCard listId={list.id} />);
    fireEvent.blur(screen.getByLabelText('List Name'));
    expect(store.getState().user.editing.listId).toBe('');
  });
});

describe('delete list', () => {
  let list: ReturnType<typeof updateStore.withList>;
  const dialogContent = 'This action cannot be undone.';

  beforeEach(() => {
    list = updateStore.withList();
    updateStore.withUser();
  });

  it('renders dialog with name', () => {
    renderWithProviders(<ListCard listId={list.id} />);
    fireEvent.click(screen.getByLabelText(`Delete list “${list.name}”`));
    expect(screen.getByText(`Delete list “${list.name}”?`)).toBeInTheDocument();
    expect(screen.getByText(dialogContent)).toBeInTheDocument();
  });

  it('renders dialog with no name', () => {
    list = updateStore.withList({ name: '' });
    updateStore.withUser();
    renderWithProviders(<ListCard listId={list.id} />);
    fireEvent.click(screen.getByLabelText('Delete list'));
    expect(screen.getByText('Delete list?')).toBeInTheDocument();
    expect(screen.getByText(dialogContent)).toBeInTheDocument();
  });

  it('cancels delete', () => {
    renderWithProviders(<ListCard listId={list.id} />);
    fireEvent.click(screen.getByLabelText(/Delete list/));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText(dialogContent)).not.toBeVisible();
    expect(screen.getByDisplayValue(list.name)).toBeInTheDocument();
  });

  it('deletes list', () => {
    renderWithProviders(<ListCard listId={list.id} />);
    fireEvent.click(screen.getByLabelText(/Delete list/));
    fireEvent.click(screen.getAllByText('Delete')[1]);
    expect(screen.queryByText(dialogContent)).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue(list.name)).not.toBeInTheDocument();
  });
});
