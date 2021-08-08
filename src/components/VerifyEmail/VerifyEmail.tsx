import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';

import { REDIRECT_TO } from '../../constants';
import { firebaseAuth } from '../../firebase';

function sendEmailVerification() {
  firebaseAuth.currentUser!.sendEmailVerification();
}

export default function VerifyEmail() {
  return (
    <>
      <Typography paragraph>
        To use Lilboards, please verify your email:
      </Typography>

      <Typography paragraph>
        <Button onClick={sendEmailVerification}>Send verification email</Button>
      </Typography>

      <Typography paragraph>
        Once your email is verified, please log out and log back in:
      </Typography>

      <Typography paragraph>
        <Button
          component={Link}
          state={{ [REDIRECT_TO]: window.location.pathname }}
          to="/logout"
        >
          Logout
        </Button>
      </Typography>
    </>
  );
}
