import Typography from '@material-ui/core/Typography';

import type { RouteComponentProps } from '@reach/router';

import Layout from '../Layout';

type Props = {
  boardId: string;
};

export default function Board(props: RouteComponentProps<Props>) {
  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        Board
      </Typography>
    </Layout>
  );
}
