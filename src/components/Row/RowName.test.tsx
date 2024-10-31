import { screen } from '@testing-library/react';
import { listId, rowId } from 'test/constants';
import { renderWithProviders, updateStore } from 'test/utils';

import RowName from './RowName';

const props = {
  listId,
  rowId,
  name: 'Row Name',
  placeholder: 'Row Placeholder',
};

// user cannot edit (not list owner)
describe('readonly', () => {
  it('renders name', () => {
    renderWithProviders(<RowName {...props} />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.name,
      }),
    ).toBeInTheDocument();
  });

  it('renders placeholder', () => {
    renderWithProviders(<RowName {...props} name="" />);
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: props.placeholder,
      }),
    ).toBeInTheDocument();
  });
});

// user can edit (list owner)
describe('edit', () => {
  it('renders input with name', () => {
    const list = updateStore.withList();
    updateStore.withUser();
    renderWithProviders(<RowName {...props} listId={list.id} />);
    expect(
      screen.getByLabelText(`Edit row “${props.name}”`),
    ).toBeInTheDocument();
  });

  it('renders input with placeholder', () => {
    const list = updateStore.withList();
    updateStore.withUser();
    renderWithProviders(<RowName {...props} listId={list.id} name="" />);
    expect(
      screen.getByLabelText(`Edit row “${props.placeholder}”`),
    ).toBeInTheDocument();
  });
});
