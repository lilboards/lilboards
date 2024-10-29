import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import type { SxProps } from '@mui/system';
import { logEvent } from 'src/firebase';
import { useDispatch, useSelector } from 'src/hooks';
import { actions } from 'src/store';

interface Props {
  sx?: SxProps;
}

export default function HideLikes(props: Props) {
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
      sx={props.sx}
    />
  );
}
