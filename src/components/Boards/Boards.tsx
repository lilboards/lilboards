import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';

import Layout from '../Layout';

export default function Boards(props: RouteComponentProps) {
  return (
    <Layout>
      <Typography component="h1" gutterBottom variant="h4">
        Boards
      </Typography>
    </Layout>
  );
}
