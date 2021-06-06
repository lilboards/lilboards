import Typography from '@material-ui/core/Typography';
import type { RouteComponentProps } from '@reach/router';
import Layout from '../Layout';

export default function Home(props: RouteComponentProps) {
  return (
    <Layout>
      <Typography>Create boards and items with Lilboards.</Typography>
    </Layout>
  );
}
