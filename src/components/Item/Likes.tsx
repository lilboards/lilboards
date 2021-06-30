import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbUpFilledIcon from '@material-ui/icons/ThumbUp';

import { useSelector } from '../../hooks';

import type { Id } from '../../types';

type Props = {
  itemId: Id;
  users: {
    [userId: string]: boolean;
  };
};

export default function Likes(props: Props) {
  const userId = useSelector((state) => state.user.id);
  const count = Object.keys(props.users).length;

  let button;
  /* istanbul ignore next */
  if (props.users[userId]) {
    button = (
      <IconButton size="small" aria-label={`Unlike item "${props.itemId}"`}>
        <ThumbUpFilledIcon />
      </IconButton>
    );
  } else {
    button = (
      <IconButton size="small" aria-label={`Like item "${props.itemId}"`}>
        <ThumbUpOutlinedIcon />
      </IconButton>
    );
  }

  /* istanbul ignore next */
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

Likes.defaultProps = {
  users: {},
};
