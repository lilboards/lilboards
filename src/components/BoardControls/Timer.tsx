import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { SxProps } from '@mui/system';
import { useCallback, useEffect, useState } from 'react';
import { DatabaseKey } from 'src/constants';
import { useDispatch, useIsAdmin, useSelector } from 'src/hooks';
import { actions } from 'src/store';
import type { Id } from 'src/types';

import Snackbar from '../Snackbar';
import { loadAlarm, playAlarm } from './audio';
import { DEFAULT_MINUTES, SECOND_IN_MILLISECONDS } from './constants';
import { formatTimeRemaining, minutesToMilliseconds } from './utils';

const initialState = {
  minutes: DEFAULT_MINUTES,
  value: String(DEFAULT_MINUTES),
  lastOpened: 0,
};

interface Props {
  boardId: Id;
  sx?: SxProps;
}

export default function Timer(props: Props) {
  const { boardId } = props;

  const dispatch = useDispatch();
  const isAdmin = useIsAdmin(DatabaseKey.boards, boardId);
  const timerEnd = useSelector(
    (state) => (state.boards[boardId] || {}).timerEnd,
  );
  const [state, setState] = useState(initialState);

  const stopTimer = useCallback(() => {
    // setState comes before dispatch action to prevent race condition
    setState({
      minutes: state.minutes,
      value: String(state.minutes),
      lastOpened: Date.now(),
    });

    setTimeout(() => {
      dispatch(
        actions.updateBoard({
          boardId,
          board: {
            timerEnd: 0,
          },
          skipSave: !isAdmin,
        }),
      );
    });
  }, [boardId, dispatch, isAdmin, setState, state.minutes]);

  useEffect(() => {
    if (!timerEnd) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= timerEnd) {
        clearInterval(interval);
        stopTimer();
        playAlarm();
      } else {
        setState({
          ...state,
          value: formatTimeRemaining(timerEnd - now),
        });
      }
    }, SECOND_IN_MILLISECONDS);

    return () => {
      clearInterval(interval);
    };
  }, [setState, state, stopTimer, timerEnd]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setState({
      minutes: Number(value),
      value,
      lastOpened: state.lastOpened,
    });
  }

  function startTimer() {
    if (isAdmin && state.minutes > 0) {
      loadAlarm();
      dispatch(
        actions.updateBoard({
          boardId,
          board: {
            timerEnd: Date.now() + minutesToMilliseconds(state.minutes),
          },
        }),
      );
    }
  }

  if (!isAdmin && !timerEnd) {
    return null;
  }

  return (
    <Box display="flex" alignItems="flex-end" sx={props.sx}>
      <Snackbar message="⏰ Time's up!" lastOpened={state.lastOpened} />
      <TextField
        disabled={Boolean(timerEnd)}
        inputProps={{
          'aria-label': 'Timer in minutes',
          min: 1,
          max: 100,
          size: 5,
        }}
        label="Timer"
        onChange={handleChange}
        placeholder="Minutes"
        size="small"
        type={timerEnd ? 'text' : 'number'}
        value={state.value}
      />
      {isAdmin && (
        <Button
          aria-label={timerEnd ? 'Stop timer' : 'Start timer'}
          onClick={timerEnd ? stopTimer : startTimer}
          sx={{ marginLeft: 1 }}
          variant="outlined"
        >
          {timerEnd ? 'Stop' : 'Start'}
        </Button>
      )}
    </Box>
  );
}
