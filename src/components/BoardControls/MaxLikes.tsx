import TextField from '@mui/material/TextField';
import type { ChangeEvent } from 'react';

import actions from '../../actions';
import { logEvent } from '../../firebase';
import { useDispatch, useIsAdmin, useMaxLikes } from '../../hooks';
import type { Id } from '../../types';

interface Props {
  boardId: Id;
}

export default function MaxLikes(props: Props) {
  const { boardId } = props;

  const dispatch = useDispatch();
  const canEdit = useIsAdmin(boardId);
  const maxLikes = useMaxLikes(boardId);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newMaxLikes = Math.floor(Number(event.target.value));
    if (canEdit && maxLikes !== newMaxLikes && newMaxLikes >= 0) {
      dispatch(
        actions.updateBoard({
          boardId,
          board: {
            maxLikes: newMaxLikes,
          },
          debounce: true,
        })
      );
      logEvent('max_likes', {
        boardId,
        maxLikes: newMaxLikes,
      });
    }
  }

  return (
    <TextField
      disabled={!canEdit}
      inputProps={{
        min: 0,
        max: 1000,
      }}
      label="Max Likes"
      onChange={handleChange}
      size="small"
      sx={{ marginRight: 2 }}
      type="number"
      value={maxLikes}
    />
  );
}
