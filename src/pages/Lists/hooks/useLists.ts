import { useEffect } from 'react';
import { getListVal, getUserListsVal } from 'src/firebase';
import { useDispatch, useGetUserId } from 'src/hooks';
import { actions } from 'src/store';

export function useLists() {
  const dispatch = useDispatch();
  const userId = useGetUserId();

  useEffect(() => {
    (async () => {
      const userLists = await getUserListsVal(userId);

      if (!userLists) {
        return;
      }

      const listIds = Object.keys(userLists);

      const lists = await Promise.all(
        listIds.map(async (listId) => {
          const list = await getListVal(listId);

          if (list) {
            return {
              list,
              listId,
            };
          }
        }),
      );

      lists.forEach((list) => list && dispatch(actions.loadList(list)));
    })();
  }, [dispatch, userId]);
}
