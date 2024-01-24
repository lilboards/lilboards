import AddIcon from '@mui/icons-material/Add';
import type { FabProps } from '@mui/material/Fab';
import Fab from '@mui/material/Fab';

type Props = Omit<FabProps, 'children'> & { children?: React.ReactNode };

export default function AddButton(props: Props) {
  return (
    <Fab color="primary" {...props}>
      <AddIcon /> {props.children}
    </Fab>
  );
}
