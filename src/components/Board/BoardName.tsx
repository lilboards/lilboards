import Typography from '@mui/material/Typography';

interface Props {
  name?: string;
}

export default function BoardName(props: Props) {
  if (!props.name) {
    return null;
  }

  return (
    <Typography component="h1" gutterBottom variant="h4">
      {props.name}
    </Typography>
  );
}
