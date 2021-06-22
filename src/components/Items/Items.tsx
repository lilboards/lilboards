import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
};

export default function Items(props: Props) {
  return (
    <Button color="primary" fullWidth variant="contained">
      <AddIcon /> Add item
    </Button>
  );
}
