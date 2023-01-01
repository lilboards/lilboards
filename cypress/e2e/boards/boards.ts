import { Before } from '@badeball/cypress-cucumber-preprocessor';

import { deleteFirebaseAccounts } from '../../support/utils';

Before(() => {
  deleteFirebaseAccounts();
});
