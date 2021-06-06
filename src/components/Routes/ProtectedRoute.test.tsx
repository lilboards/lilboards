import { screen } from '@testing-library/react';
import { renderWithStore, updateStore } from '../../utils/test';
import ProtectedRoute from './ProtectedRoute';

const protectedText = 'protected';

function ProtectedComponent() {
  return <>{protectedText}</>;
}

it('does not render protected component when user is not signed in', () => {
  renderWithStore(
    <ProtectedRoute component={ProtectedComponent} path="/protected" />
  );
  expect(screen.queryByText(protectedText)).not.toBeInTheDocument();
});

it('renders protected component when user is signed in', () => {
  updateStore.withUser();
  renderWithStore(
    <ProtectedRoute component={ProtectedComponent} path="/protected" />
  );
  expect(screen.getByText(protectedText)).toBeInTheDocument();
});
