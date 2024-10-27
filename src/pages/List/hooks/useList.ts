import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { getListDataRef } from 'src/firebase';
import { useDispatch, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import { Id } from 'src/types';

export function useList(listId: Id) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists[listId]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!listId) {
      return;
    }

    // subscribe to list value
    const unsubscribeOnValue = onValue(
      getListDataRef(listId),
      (listSnapshot) => {
        const list = listSnapshot.val();

        if (list) {
          // prevent race condition with redux reducer
          setTimeout(() => {
            dispatch(
              actions.loadList({
                list,
                listId,
              }),
            );
            setIsLoaded(true);
          });
        } else {
          // list removed
          dispatch(
            actions.deleteList({
              listId,
              skipSave: true,
              userId: '',
            }),
          );
          setIsLoaded(true);
        }
      },
    );

    // unsubscribe on unmount
    return () => {
      unsubscribeOnValue();
      setIsLoaded(false);
    };
  }, [listId, dispatch, setIsLoaded]);

  return {
    list,
    isLoaded,
  };
}
