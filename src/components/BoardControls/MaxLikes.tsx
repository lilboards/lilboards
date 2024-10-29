import TextField from '@mui/material/TextField';
import type { SxProps } from '@mui/system';
import { DatabaseKey } from 'src/constants';
import { logEvent } from 'src/firebase';
import { useDispatch, useIsAdmin, useMaxLikes } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  boardId: Id;
  sx?: SxProps;
}

export default function MaxLikes(props: Props) {
  const { boardId } = props;

  const dispatch = useDispatch();
  const canEdit = useIsAdmin(DatabaseKey.boards, boardId);
  const maxLikes = useMaxLikes(boardId);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newMaxLikes = Math.floor(Number(event.target.value));
    if (canEdit && maxLikes !== newMaxLikes && newMaxLikes >= 0) {
      dispatch(
        actions.updateBoard({
          boardId,
          board: {
            maxLikes: newMaxLikes,
          },
          debounce: true,
        }),
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
