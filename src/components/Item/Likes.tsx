import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpFilledIcon from '@material-ui/icons/ThumbUp';

import actions from '../../actions';
import { likeItem, unlikeItem } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';
import { countObject } from '../../utils';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  itemId: Id;
};

export default function Likes(props: Props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const likes = useSelector((state) => {
    const item = state.items[props.itemId];
    return (item && item.likes) || {};
  });

  const count = countObject(likes);
  const isLikedByUser = likes[userId];

  function handleClick() {
    if (!userId) {
      return;
    }
    const payload = {
      itemId: props.itemId,
      userId,
    };
    if (isLikedByUser) {
      dispatch(actions.unlikeItem(payload));
      unlikeItem(props.boardId, props.itemId, userId);
    } else {
      dispatch(actions.likeItem(payload));
      likeItem(props.boardId, props.itemId, userId);
    }
  }

  let button;
  if (isLikedByUser) {
    button = (
      <IconButton
        size="small"
        aria-label={`Unlike item "${props.itemId}"`}
        onClick={handleClick}
      >
        <ThumbUpFilledIcon />
      </IconButton>
    );
  } else {
    button = (
      <IconButton
        size="small"
        aria-label={`Like item "${props.itemId}"`}
        onClick={handleClick}
      >
        <ThumbUpOutlinedIcon />
      </IconButton>
    );
  }

  const label = `${count} ${count === 1 ? 'like' : 'likes'} for item "${
    props.itemId
  }"`;

  return (
    <>
      {button}
      <Box aria-label={label} component="span" marginLeft={0.5} marginRight={1}>
        {count}
      </Box>
    </>
  );
}
