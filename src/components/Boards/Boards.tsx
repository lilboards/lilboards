import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import { useDispatch, useSelector } from '../../hooks';
import actions from '../../actions';
import Layout from '../Layout';

export default function Boards(props: RouteComponentProps) {
  const boards = useSelector((state) => Object.values(state.boards));
  const dispatch = useDispatch();

  function addBoard() {
    dispatch(actions.addBoard());
  }

  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>

      <Box marginBottom={2}>
        <Fab aria-label="Create board" color="primary" onClick={addBoard}>
          <AddIcon />
        </Fab>
      </Box>

      <Grid container spacing={2}>
        {boards.reverse().map((board) => (
          <Grid item key={board.id} xs={12} sm={6} md={3}>
            <Box component={Card} height="100%">
              <CardContent>{board.name}</CardContent>
              <CardActions>
                <Button>Open board</Button>
              </CardActions>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
