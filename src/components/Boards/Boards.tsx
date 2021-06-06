import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import Layout from '../Layout';

export default function Boards(props: RouteComponentProps) {
  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>

      <Box marginBottom={2}>
        <Fab color="primary" aria-label="Create board">
          <AddIcon />
        </Fab>
      </Box>
    </Layout>
  );
}
