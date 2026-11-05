import { expect, it } from 'vitest';

import uiConfig from './uiConfig';

it('matches FirebaseUI config', () => {
  expect(uiConfig).toMatchSnapshot();
});

it('avoids redirect after sign-in', () => {
  expect(uiConfig.callbacks.signInSuccessWithAuthResult()).toBe(false);
});
