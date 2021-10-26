import type { FabProps } from '@material-ui/core/Fab';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import type { ReactNode } from 'react';

type Props = Omit<FabProps, 'children'> & { children?: ReactNode };

export default function AddButton(props: Props) {
  return (
    <Fab color="primary" {...props}>
      <AddIcon /> {props.children}
    </Fab>
  );
}
