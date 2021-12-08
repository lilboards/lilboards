import Box from '@mui/material/Box';

import type { Id } from '../../types';
import AddColumn from './AddColumn';
import MaxLikes from './MaxLikes';
import Present from './Present';
import Sort from './Sort';
import Timer from './Timer';

interface Props {
  boardId: Id;
}

export default function BoardControls(props: Props) {
  return (
    <Box display="flex" marginBottom={4}>
      <Box flexGrow={1}>
        <AddColumn boardId={props.boardId} />
      </Box>

      <Timer boardId={props.boardId} />

      <MaxLikes boardId={props.boardId} />

      <Present />

      <Sort boardId={props.boardId} />
    </Box>
  );
}
