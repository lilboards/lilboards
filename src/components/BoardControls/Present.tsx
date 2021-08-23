import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import actions from '../../actions';
import { firebaseAnalytics } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

export default function Present() {
  const dispatch = useDispatch();
  const presenting = useSelector((state) => state.user.presenting);

  function handleChange() {
    dispatch(actions.toggleUserPresenting());
    firebaseAnalytics.logEvent('user_presenting', {
      checked: !presenting,
    });
  }

  return (
    <FormControlLabel
      control={
        <Switch checked={presenting} color="primary" onChange={handleChange} />
      }
      label="Present"
    />
  );
}
