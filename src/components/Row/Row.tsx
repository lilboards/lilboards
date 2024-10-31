import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { useGetRow } from 'src/hooks';
import type { Id } from 'src/types';

import ListItems from '../ListItems';
import RowName from './RowName';

interface Props {
  listId: Id;
  rowId: Id;
  rowIndex: number;
}

export default function Row(props: Props) {
  const row = useGetRow(props.rowId);
  const rowPlaceholder = `Row ${props.rowIndex + 1}`;

  if (!row) {
    return null;
  }

  return (
    <Card sx={{ marginTop: 4, width: '100%' }}>
      <CardHeader
        title={
          <RowName
            listId={props.listId}
            rowId={props.rowId}
            name={row.name}
            placeholder={rowPlaceholder}
          />
        }
        sx={{ paddingBottom: 0 }}
      />

      <CardContent>
        <ListItems listId={props.listId} rowId={props.rowId} />
      </CardContent>
    </Card>
  );
}
