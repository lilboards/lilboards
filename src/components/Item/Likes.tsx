import Box from '@mui/material/Box';
import { useLikes } from 'src/hooks';
import type { Id } from 'src/types';
import { countObject } from 'src/utils';

import LikeButton from './LikeButton';

interface Props {
  boardId: Id;
  itemId: Id;
}

export default function Likes(props: Props) {
  const likes = useLikes(props.itemId);
  const likesCount = countObject(likes);

  return (
    <>
      <LikeButton boardId={props.boardId} itemId={props.itemId} />

      <Box
        aria-label={`${likesCount} ${
          likesCount === 1 ? 'like' : 'likes'
        } for item`}
        component="span"
        marginLeft={0.5}
        marginRight={1}
      >
        {likesCount}
      </Box>
    </>
  );
}
