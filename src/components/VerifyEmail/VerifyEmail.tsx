import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Layout from '../Layout';

import { firebaseAuth } from '../../firebase';

function sendEmailVerification() {
  firebaseAuth.currentUser!.sendEmailVerification();
}

/* istanbul ignore next */
function reloadPage() {
  window.location.reload();
}

export default function VerifyEmail() {
  return (
    <Layout>
      <Typography paragraph>
        To use Lilboards, please verify your email:
      </Typography>

      <Typography paragraph>
        <Button onClick={sendEmailVerification}>Send verification email</Button>
      </Typography>

      <Typography paragraph>
        Once your email is verified, please reload the page:
      </Typography>

      <Typography paragraph>
        <Button onClick={reloadPage}>Reload page</Button>
      </Typography>
    </Layout>
  );
}
