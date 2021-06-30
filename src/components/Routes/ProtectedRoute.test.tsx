import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import ProtectedRoute from './ProtectedRoute';

const protectedText = 'protected';

function ProtectedComponent() {
  return <>{protectedText}</>;
}

describe('not signed in', () => {
  it('does not render protected component', () => {
    renderWithStore(
      <ProtectedRoute component={ProtectedComponent} path="/protected" />
    );
    expect(screen.queryByText(protectedText)).not.toBeInTheDocument();
  });
});

describe('signed in with email', () => {
  it('renders protected component', () => {
    updateStore.withUser();
    renderWithStore(
      <ProtectedRoute component={ProtectedComponent} path="/protected" />
    );
    expect(screen.getByText(protectedText)).toBeInTheDocument();
  });
});

describe('signed in email', () => {
  it('does not render protected component', () => {
    updateStore.withUser(false);
    renderWithStore(
      <ProtectedRoute component={ProtectedComponent} path="/protected" />
    );
    expect(screen.queryByText(protectedText)).not.toBeInTheDocument();
  });
});
