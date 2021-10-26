import IconButton from '@material-ui/core/IconButton';
import ThumbUpFilledIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import actions from '../../actions';
import { firebaseAnalytics } from '../../firebase';
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
      firebaseAnalytics.logEvent('unlike_item');
    } else {
      dispatch(actions.likeItem(payload));
      firebaseAnalytics.logEvent('like_item');
    }
  }

  return (
    <IconButton
      size="small"
      aria-label={`${isLikedByUser ? 'Unlike' : 'Like'} item "${props.itemId}"`}
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
