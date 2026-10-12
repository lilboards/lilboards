/**
 * Security rules tests.
 *
 * Runs against the Firebase database emulator:
 *
 * ```sh
 * npm run test:rules
 * ```
 *
 * @see {@link https://firebase.google.com/docs/database/security/test-rules}
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestContext,
  type RulesTestEnvironment,
} from '@firebase/rules-unit-testing';

const projectId = process.env.GCLOUD_PROJECT || 'test-lilboards';
const [host = '127.0.0.1', port = '9000'] = (
  process.env.FIREBASE_DATABASE_EMULATOR_HOST || '127.0.0.1:9000'
).split(':');

let testEnv: RulesTestEnvironment;

const ref = (context: RulesTestContext, path: string) =>
  context.database().ref(path);

/** A signed-in user with a verified email. */
const verified = (uid: string) =>
  testEnv.authenticatedContext(uid, { email_verified: true });

/** A signed-in user whose email is not verified. */
const unverified = (uid: string) =>
  testEnv.authenticatedContext(uid, { email_verified: false });

/**
 * A share-link visitor signed in anonymously (no email claims).
 *
 * See `src/components/Protected/Protected.tsx`.
 */
const anonymous = (uid = 'anon') => testEnv.authenticatedContext(uid);

const signedOut = () => testEnv.unauthenticatedContext();

const seed = () =>
  testEnv.withSecurityRulesDisabled(async (context) => {
    await ref(context, 'boards/board1/board').set({
      createdAt: 1,
      createdBy: 'alice',
      name: 'Board 1',
    });
    await ref(context, 'boards/board1/columns/col1').set({
      createdAt: 1,
      createdBy: 'alice',
      itemIds: ['item1'],
      name: 'Column 1',
    });
    await ref(context, 'boards/board1/items/item1').set({
      createdAt: 1,
      createdBy: 'alice',
      text: 'Hello',
    });
    await ref(context, 'boards/board1/likes/items/item1').set({ alice: true });
    await ref(context, 'boards/board2/board').set({
      createdAt: 1,
      createdBy: 'alice',
      name: 'Board 2',
    });
    await ref(context, 'lists/list1/list').set({
      createdAt: 1,
      createdBy: 'alice',
      name: 'List 1',
    });
    await ref(context, 'lists/list1/rows/row1').set({
      createdAt: 1,
      createdBy: 'alice',
      itemIds: ['litem1'],
      name: 'Row 1',
    });
    await ref(context, 'lists/list1/items/litem1').set({
      createdAt: 1,
      createdBy: 'alice',
      text: 'List item',
    });
    await ref(context, 'lists/list2/list').set({
      createdAt: 1,
      createdBy: 'alice',
      name: 'List 2',
    });
    await ref(context, 'users/alice/boards/board1').set(true);
  });

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId,
    database: {
      host,
      port: Number(port),
      rules: readFileSync(
        resolve(__dirname, '../../database.rules.json'),
        'utf8',
      ),
    },
  });
});

beforeEach(async () => {
  await testEnv.clearDatabase();
  await seed();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('reads', () => {
  it('denies signed-out users', async () => {
    await assertFails(ref(signedOut(), 'boards/board1').once('value'));
    await assertFails(ref(signedOut(), 'users/alice').once('value'));
  });

  it('allows any signed-in user, including anonymous visitors', async () => {
    await assertSucceeds(ref(verified('bob'), 'boards/board1').once('value'));
    await assertSucceeds(ref(anonymous(), 'boards/board1').once('value'));
    await assertSucceeds(ref(anonymous(), 'boards/board1/board').once('value'));
    await assertSucceeds(
      ref(unverified('mallory'), 'lists/list1').once('value'),
    );
  });

  it('does not allow enumerating all boards or lists', async () => {
    await assertFails(ref(verified('bob'), 'boards').once('value'));
    await assertFails(ref(verified('bob'), 'lists').once('value'));
  });

  it('restricts user data to its owner', async () => {
    await assertSucceeds(ref(verified('alice'), 'users/alice').once('value'));
    await assertFails(ref(verified('bob'), 'users/alice').once('value'));
    await assertFails(ref(unverified('alice'), 'users/alice').once('value'));
  });
});

describe('boards', () => {
  it('lets the creator rename the board', async () => {
    await assertSucceeds(
      ref(verified('alice'), 'boards/board1/board').update({ name: 'Renamed' }),
    );
  });

  it('prevents other users from renaming the board', async () => {
    await assertFails(
      ref(verified('bob'), 'boards/board1/board').update({ name: 'Renamed' }),
    );
    await assertFails(
      ref(unverified('mallory'), 'boards/board1/board').update({
        name: 'Renamed',
      }),
    );
  });

  it('prevents other users from taking ownership', async () => {
    await assertFails(
      ref(verified('bob'), 'boards/board1/board').update({
        createdBy: 'bob',
      }),
    );
  });

  it('prevents other users from deleting the board', async () => {
    await assertFails(ref(verified('bob'), 'boards/board1').remove());
    await assertFails(ref(verified('bob'), 'boards/board1/board').remove());
  });

  it('prevents unverified users from writing board data', async () => {
    await assertFails(
      ref(unverified('alice'), 'boards/board1/board').update({
        name: 'Renamed',
      }),
    );
  });

  it('lets the creator delete the board', async () => {
    await assertSucceeds(ref(verified('alice'), 'boards/board2').remove());
  });

  it('lets a verified user create a board they own', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'boards/board3/board').set({
        createdAt: 1,
        createdBy: 'bob',
        name: '',
      }),
    );
  });

  it('prevents creating a board owned by someone else', async () => {
    await assertFails(
      ref(verified('bob'), 'boards/board3/board').set({
        createdAt: 1,
        createdBy: 'alice',
        name: '',
      }),
    );
  });

  it('prevents anonymous and unverified users from creating boards', async () => {
    await assertFails(
      ref(anonymous(), 'boards/board3/board').set({
        createdAt: 1,
        createdBy: 'anon',
        name: '',
      }),
    );
    await assertFails(
      ref(unverified('mallory'), 'boards/board3/board').set({
        createdAt: 1,
        createdBy: 'mallory',
        name: '',
      }),
    );
  });
});

describe('columns', () => {
  it('lets the creator manage columns', async () => {
    await assertSucceeds(
      ref(verified('alice'), 'boards/board1/columns/col2').set({
        createdAt: 1,
        createdBy: 'alice',
        name: 'Column 2',
      }),
    );
    await assertSucceeds(
      ref(verified('alice'), 'boards/board1/columns/col1').update({
        name: 'Renamed',
      }),
    );
    await assertSucceeds(
      ref(verified('alice'), 'boards/board1/columns/col2').remove(),
    );
  });

  it('prevents other users from creating, renaming, or deleting columns', async () => {
    await assertFails(
      ref(verified('bob'), 'boards/board1/columns/col2').set({
        createdAt: 1,
        createdBy: 'bob',
        name: 'Column 2',
      }),
    );
    await assertFails(
      ref(verified('bob'), 'boards/board1/columns/col1').update({
        name: 'Renamed',
      }),
    );
    await assertFails(
      ref(verified('bob'), 'boards/board1/columns/col1').remove(),
    );
  });

  it('lets any signed-in user reorder column item ids', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/columns/col1/itemIds').set(['item1']),
    );
    await assertSucceeds(
      ref(anonymous(), 'boards/board1/columns/col1/itemIds').set(['item1']),
    );
  });

  it('scopes column writes to the itemIds path', async () => {
    // multi-path updates are evaluated against each target leaf
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/columns').update({
        'col1/itemIds': ['item1'],
      }),
    );
    // other leaves and the columns root itself stay out of reach
    await assertFails(
      ref(verified('bob'), 'boards/board1/columns').update({
        'col1/name': 'Hijacked',
      }),
    );
    await assertFails(ref(verified('bob'), 'boards/board1/columns').remove());
  });
});

describe('items', () => {
  it('lets any signed-in user add, edit, and remove items', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/items/item2').set({
        createdAt: 1,
        createdBy: 'bob',
        text: 'New item',
      }),
    );
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/items/item1').update({
        text: 'Combined',
        updatedAt: 2,
        updatedBy: 'bob',
      }),
    );
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/items/item1').remove(),
    );
  });

  it('lets anonymous collaborators add items', async () => {
    await assertSucceeds(
      ref(anonymous(), 'boards/board1/items/item2').set({
        createdAt: 1,
        createdBy: 'anon',
        text: 'New item',
      }),
    );
  });

  it('prevents replacing all items at once', async () => {
    await assertFails(ref(verified('bob'), 'boards/board1/items').remove());
  });
});

describe('likes', () => {
  it('lets any signed-in user like and unlike items', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/likes/items/item1/bob').set(true),
    );
    await assertSucceeds(
      ref(anonymous(), 'boards/board1/likes/items/item1/anon').set(true),
    );
    await assertSucceeds(
      ref(anonymous(), 'boards/board1/likes/items/item1/anon').remove(),
    );
  });

  it('lets any verified user rewrite an item likes map', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'boards/board1/likes/items/item1').set({
        alice: true,
        bob: true,
      }),
    );
  });

  it('prevents removing all likes at once', async () => {
    await assertFails(
      ref(verified('bob'), 'boards/board1/likes/items').remove(),
    );
  });
});

describe('lists', () => {
  it('lets the creator rename and delete the list', async () => {
    await assertSucceeds(
      ref(verified('alice'), 'lists/list1/list').update({ name: 'Renamed' }),
    );
    await assertSucceeds(ref(verified('alice'), 'lists/list2').remove());
  });

  it('prevents other users from renaming or deleting the list', async () => {
    await assertFails(
      ref(verified('bob'), 'lists/list1/list').update({ name: 'Renamed' }),
    );
    await assertFails(
      ref(verified('bob'), 'lists/list1/list').update({ createdBy: 'bob' }),
    );
    await assertFails(ref(verified('bob'), 'lists/list1').remove());
  });

  it('lets the creator manage rows', async () => {
    await assertSucceeds(
      ref(verified('alice'), 'lists/list1/rows/row2').set({
        createdAt: 1,
        createdBy: 'alice',
        name: 'Row 2',
      }),
    );
    await assertSucceeds(
      ref(verified('alice'), 'lists/list1/rows/row1').update({
        name: 'Renamed',
      }),
    );
    await assertSucceeds(
      ref(verified('alice'), 'lists/list1/rows/row2').remove(),
    );
  });

  it('prevents other users from creating, renaming, or deleting rows', async () => {
    await assertFails(
      ref(verified('bob'), 'lists/list1/rows/row2').set({
        createdAt: 1,
        createdBy: 'bob',
        name: 'Row 2',
      }),
    );
    await assertFails(
      ref(verified('bob'), 'lists/list1/rows/row1').update({
        name: 'Renamed',
      }),
    );
    await assertFails(ref(verified('bob'), 'lists/list1/rows/row1').remove());
  });

  it('lets any signed-in user reorder row item ids', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'lists/list1/rows/row1/itemIds').set(['litem1']),
    );
    await assertSucceeds(
      ref(anonymous(), 'lists/list1/rows/row1/itemIds').set(['litem1']),
    );
  });

  it('lets any signed-in user add a list item', async () => {
    await assertSucceeds(
      ref(verified('bob'), 'lists/list1/items/litem2').set({
        createdAt: 1,
        createdBy: 'bob',
        text: 'New item',
      }),
    );
    await assertSucceeds(
      ref(anonymous(), 'lists/list1/items/litem2').set({
        createdAt: 1,
        createdBy: 'anon',
        text: 'New item',
      }),
    );
  });
});

describe('users', () => {
  it('lets a verified user update their own data', async () => {
    await assertSucceeds(
      ref(verified('alice'), 'users/alice/boards/board2').set(true),
    );
  });

  it('prevents users from writing to other users', async () => {
    await assertFails(
      ref(verified('bob'), 'users/alice/boards/board2').set(true),
    );
  });

  it('prevents unverified users from writing their own data', async () => {
    await assertFails(
      ref(unverified('mallory'), 'users/mallory/boards/board1').set(true),
    );
  });
});
