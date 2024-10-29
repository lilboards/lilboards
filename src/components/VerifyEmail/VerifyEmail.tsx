import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { REDIRECT_TO } from 'src/constants';
import { sendEmailVerification } from 'src/firebase';

import Snackbar from '../Snackbar';

export default function VerifyEmail() {
  const [emailSentTime, setEmailSentTime] = useState(0);

  function sendEmail() {
    sendEmailVerification();
    setEmailSentTime(Date.now());
  }

  return (
    <>
      <Snackbar message="Email sent" lastOpened={emailSentTime} />

      <Typography paragraph>
        To use Lilboards, please verify your email:
      </Typography>

      <Typography paragraph>
        <Button color="primary" onClick={sendEmail} variant="outlined">
          Send verification email
        </Button>
      </Typography>

      <Typography paragraph>
        Once your email is verified, please log out and log back in:
      </Typography>

      <Typography paragraph>
        <Button
          color="secondary"
          component={Link}
          state={{ [REDIRECT_TO]: window.location.pathname }}
          to="/logout"
          variant="outlined"
        >
          Logout
        </Button>
      </Typography>
    </>
  );
}
