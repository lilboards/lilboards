import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import actions from '../../actions';
import { logEvent } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

export default function Present() {
  const dispatch = useDispatch();
  const presenting = useSelector((state) => state.user.presenting);

  function handleChange() {
    dispatch(actions.toggleUserPresenting());
    logEvent('user_presenting', {
      checked: !presenting,
    });
  }

  return (
    <FormControlLabel
      control={
        <Switch checked={presenting} color="primary" onChange={handleChange} />
      }
      label="Hide Likes"
    />
  );
}
