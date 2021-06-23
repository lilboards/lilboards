import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import type { Id } from '../../types';

type Props = {
  boardId: Id;
  columnId: Id;
  itemId: Id;
};

export default function Item(props: Props) {
  return (
    <Card>
      <CardContent></CardContent>
    </Card>
  );
}
