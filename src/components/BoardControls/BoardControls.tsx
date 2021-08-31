import Box from '@material-ui/core/Box';

import AddColumn from './AddColumn';
import Present from './Present';
import Sort from './Sort';
import Timer from './Timer';

import type { Id } from '../../types';

interface Props {
  boardId: Id;
}

export default function BoardControls(props: Props) {
  return (
    <Box display="flex" marginBottom={4}>
      <Box flexGrow={1}>
        <AddColumn boardId={props.boardId} />
      </Box>

      <Box marginRight={3}>
        <Timer />
      </Box>

      <Present />

      <Sort boardId={props.boardId} />
    </Box>
  );
}
