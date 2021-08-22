import Box from '@material-ui/core/Box';

import LikeButton from './LikeButton';

import { useSelector } from '../../hooks';
import { countObject } from '../../utils';

import type { Id } from '../../types';

interface Props {
  boardId: Id;
  itemId: Id;
}

export default function Likes(props: Props) {
  const likes = useSelector((state) => state.likes.items[props.itemId] || {});
  const count = countObject(likes);
  const label = `${count} ${count === 1 ? 'like' : 'likes'} for item "${
    props.itemId
  }"`;

  return (
    <>
      <LikeButton boardId={props.boardId} itemId={props.itemId} />

      <Box aria-label={label} component="span" marginLeft={0.5} marginRight={1}>
        {count}
      </Box>
    </>
  );
}
