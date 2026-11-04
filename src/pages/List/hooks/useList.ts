import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseKey } from 'src/constants';
import { getListDataRef } from 'src/firebase';
import { useBoardOrList, useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import { Id, List } from 'src/types';

export function useList(listId: Id) {
  const dispatch = useDispatch();
  const list = useBoardOrList(DatabaseKey.lists, listId);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (listId && !list && isLoaded) {
      void navigate('/404');
    }
  }, [listId, list, isLoaded, navigate]);

  useEffect(() => {
    if (!listId) {
      return;
    }

    // subscribe to list value
    const unsubscribeOnValue = onValue(
      getListDataRef(listId),
      (listSnapshot) => {
        const list = listSnapshot.val() as List | null;

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

  return list;
}
