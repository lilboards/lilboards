import Box from '@material-ui/core/Box';

import AddColumn from './AddColumn';
import Sort from './Sort';

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

      <Sort boardId={props.boardId} />
    </Box>
  );
}
