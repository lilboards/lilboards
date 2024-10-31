import { useCallback } from 'react';
import { logEvent } from 'src/firebase';
import { useDispatch } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import CloseButton from '../CloseButton';

export const CLASSNAME_DELETE_ICON = 'delete-icon';

interface Props {
  listId: Id;
  rowId: Id;
  itemId: Id;
  itemText: string;
}

export default function Delete(props: Props) {
  const dispatch = useDispatch();

  const deleteItem = useCallback(() => {
    dispatch(
      actions.removeListItem({
        listId: props.listId,
        itemId: props.itemId,
      }),
    );

    dispatch(
      actions.removeRowItemId({
        listId: props.listId,
        rowId: props.rowId,
        itemId: props.itemId,
      }),
    );

    logEvent('delete_item');
  }, [dispatch, props]);

  return (
    <CloseButton
      aria-label={`Delete item “${props.itemText}”`}
      className={CLASSNAME_DELETE_ICON}
      onClick={deleteItem}
      size="small"
      sx={{ visibility: 'hidden' }}
      svgIconProps={{ fontSize: 'small' }}
    />
  );
}
