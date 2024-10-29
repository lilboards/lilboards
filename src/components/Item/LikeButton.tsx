import ThumbUpFilledIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import IconButton from '@mui/material/IconButton';
import { logEvent } from 'src/firebase';
import {
  useDispatch,
  useGetLikes,
  useGetUserId,
  useMaxLikes,
  useSelector,
} from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

interface Props {
  boardId: Id;
  itemId: Id;
}

export default function LikeButton(props: Props) {
  const dispatch = useDispatch();
  const userId = useGetUserId();
  const itemText = useSelector(
    (state) => state.items[props.itemId]?.text || '',
  );
  const likes = useGetLikes(props.itemId);
  const isLikedByUser = likes[userId];
  const totalLikes = useSelector((state) =>
    Object.values(state.likes.items).reduce(
      (sum, item) => sum + Number(Boolean(item[userId])),
      0,
    ),
  );
  const maxLikes = useMaxLikes(props.boardId);
  const hideLikes = useSelector((state) => state.user.hideLikes);

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
      aria-label={`${isLikedByUser ? 'Unlike' : 'Like'} item "${itemText}"`}
      onClick={handleClick}
    >
      {isLikedByUser && !hideLikes ? (
        <ThumbUpFilledIcon />
      ) : (
        <ThumbUpOutlinedIcon />
      )}
    </IconButton>
  );
}
