import { push } from 'firebase/database';

import { rootRef } from './database';

/**
 * Generates database reference key.
 *
 * @see {@link https://firebase.blog/posts/2015/02/the-2120-ways-to-ensure-unique_68}
 */
export const generateId = () => push(rootRef).key!;
