import ThumbUpFilledIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import IconButton from '@mui/material/IconButton';

import actions from '../../actions';
import { logEvent } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import type { Id } from '../../types';

interface Props {
  boardId: Id;
  itemId: Id;
}

export default function LikeButton(props: Props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const likes = useSelector((state) => state.likes.items[props.itemId] || {});
  const isUserPresenting = useSelector((state) => state.user.presenting);
  const isLikedByUser = likes[userId];

  function handleClick() {
    const payload = {
      boardId: props.boardId,
      itemId: props.itemId,
      userId,
    };
    if (isLikedByUser) {
      dispatch(actions.unlikeItem(payload));
      logEvent('unlike_item');
    } else {
      dispatch(actions.likeItem(payload));
      logEvent('like_item');
    }
  }

  return (
    <IconButton
      size="small"
      aria-label={`${isLikedByUser ? 'Unlike' : 'Like'} item`}
      onClick={handleClick}
    >
      {isLikedByUser && !isUserPresenting ? (
        <ThumbUpFilledIcon />
      ) : (
        <ThumbUpOutlinedIcon />
      )}
    </IconButton>
  );
}
