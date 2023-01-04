import { Before } from '@badeball/cypress-cucumber-preprocessor';

import { deleteFirebaseAccounts } from '../utils';

Before(() => {
  deleteFirebaseAccounts();
});
