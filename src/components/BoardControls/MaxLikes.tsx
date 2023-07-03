import TextField from '@mui/material/TextField';
import type { SxProps } from '@mui/system';
import type { ChangeEvent } from 'react';

import { logEvent } from '../../firebase';
import { useDispatch, useIsAdmin, useMaxLikes } from '../../hooks';
import { actions } from '../../store';
import type { Id } from '../../types';

interface Props {
  boardId: Id;
  sx?: SxProps;
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
      sx={props.sx}
      type="number"
      value={maxLikes}
    />
  );
}
