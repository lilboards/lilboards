import { screen } from '@testing-library/react';
import { renderWithStore } from '../../utils/test';
import { ITEM_TEST_ID as itemId } from '../../constants/test';
import Likes from './Likes';

it('renders like button', () => {
  renderWithStore(<Likes itemId={itemId} />);
  expect(screen.getByRole('button')).toBe(screen.getByLabelText(/Like item/));
});
