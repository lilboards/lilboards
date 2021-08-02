import Typography from '@material-ui/core/Typography';

import Layout from '../Layout';

import type { RouteComponentProps } from '@reach/router';

export default function Home(props: RouteComponentProps) {
  return (
    <Layout>
      <Typography>Create boards, columns, and items.</Typography>
    </Layout>
  );
}
