import ThumbUpFilledIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import IconButton from '@mui/material/IconButton';

import actions from '../../actions';
import { logEvent } from '../../firebase';
import { useDispatch, useMaxLikes, useSelector } from '../../hooks';
import type { Id } from '../../types';

interface Props {
  boardId: Id;
  itemId: Id;
}

export default function LikeButton(props: Props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const likes = useSelector((state) => state.likes.items[props.itemId] || {});
  const isLikedByUser = likes[userId];
  const totalLikes = useSelector((state) =>
    Object.values(state.likes.items).reduce((accumulator, item) => {
      if (item[userId]) {
        accumulator++;
      }
      return accumulator;
    }, 0)
  );
  const maxLikes = useMaxLikes(props.boardId);
  const isUserPresenting = useSelector((state) => state.user.presenting);

  function handleClick() {
    const payload = {
      boardId: props.boardId,
      itemId: props.itemId,
      userId,
    };
    if (isLikedByUser) {
      dispatch(actions.unlikeItem(payload));
      logEvent('unlike_item');
    } else if (totalLikes < maxLikes) {
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
