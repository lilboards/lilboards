import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import actions from '../../actions';
import { logEvent } from '../../firebase';
import { useDispatch, useSelector } from '../../hooks';

export default function HideLikes() {
  const dispatch = useDispatch();
  const hideLikes = useSelector((state) => state.user.hideLikes);

  function handleChange() {
    dispatch(actions.toggleUserHideLikes());
    logEvent('hide_likes', { checked: !hideLikes });
  }

  return (
    <FormControlLabel
      control={
        <Switch checked={hideLikes} color="primary" onChange={handleChange} />
      }
      label="Hide Likes"
      sx={{ marginRight: 0 }}
    />
  );
}
