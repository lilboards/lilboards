import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
  content: React.ReactNode;
  id: string;
  onClose: () => void;
  onDelete: () => void;
  open?: boolean;
  title: React.ReactNode;
}

export default function DeleteDialog(props: Props) {
  const titleId = `dialog-title-${props.id}`;
  const contentId = `dialog-content-${props.id}`;

  return (
    <Dialog
      open={Boolean(props.open)}
      onClose={props.onClose}
      aria-labelledby={titleId}
      aria-describedby={contentId}
    >
      <DialogTitle id={titleId}>{props.title}</DialogTitle>

      <DialogContent>
        <DialogContentText id={contentId}>{props.content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>

        <Button autoFocus color="error" onClick={props.onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
