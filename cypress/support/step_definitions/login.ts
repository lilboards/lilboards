import type { DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { Given } from '@badeball/cypress-cucumber-preprocessor';
import {
  When_I_click_on_button,
  When_I_get_focused_element,
  When_I_type,
  When_I_visit_URL,
} from 'cypress-cucumber-steps';

import account from '../../fixtures/account.json';

Given('I login', (table?: DataTable) => {
  const [{ email, password }] = table?.hashes() || [account];
  When_I_visit_URL('/login');
  When_I_click_on_button('Sign in with email');
  When_I_get_focused_element();
  When_I_type(email);
  When_I_click_on_button('Next');
  When_I_get_focused_element();
  When_I_type(password);
  When_I_click_on_button('Sign In');
});
