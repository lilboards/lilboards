import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import actions from '../../actions';
import { useDispatch, useSelector } from '../../hooks';
import type { Id } from '../../types';
import { DEFAULT_MINUTES, SECOND_IN_MILLISECONDS } from './constants';
import { formatTimeRemaining, minutesToMilliseconds } from './utils';

const initialState = {
  minutes: DEFAULT_MINUTES,
  value: String(DEFAULT_MINUTES),
};

interface Props {
  boardId: Id;
}

export default function Timer(props: Props) {
  const { boardId } = props;

  const dispatch = useDispatch();
  const canEdit = useSelector(
    (state) => (state.boards[props.boardId] || {}).createdBy === state.user.id
  );
  const timerEnd = useSelector(
    (state) => (state.boards[boardId] || {}).timerEnd
  );
  const [state, setState] = useState(initialState);

  const stopTimer = useCallback(() => {
    // setState comes before dispatch action to prevent race condition
    setState({
      minutes: state.minutes,
      value: String(state.minutes),
    });
    setTimeout(() => {
      dispatch(
        actions.updateBoard({
          boardId,
          board: {
            timerEnd: 0,
          },
        })
      );
    });
  }, [dispatch, boardId, setState, state.minutes]);

  useEffect(() => {
    if (!timerEnd) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= timerEnd) {
        clearInterval(interval);
        stopTimer();
        alert("⏰ Time's up!");
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

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setState({
      minutes: Number(value),
      value,
    });
  }

  function startTimer() {
    if (canEdit && state.minutes > 0) {
      dispatch(
        actions.updateBoard({
          boardId,
          board: {
            timerEnd: Date.now() + minutesToMilliseconds(state.minutes),
          },
        })
      );
    }
  }

  if (!canEdit && !timerEnd) {
    return null;
  }

  return (
    <Box display="flex" alignItems="flex-end">
      <TextField
        disabled={Boolean(timerEnd)}
        inputProps={{
          'aria-label': 'Timer in minutes',
          min: 1,
          max: 1e6,
          size: 9,
        }}
        label="Timer"
        onChange={handleChange}
        placeholder="Minutes"
        size="small"
        type={timerEnd ? 'text' : 'number'}
        value={state.value}
      />

      {canEdit && (
        <Box marginLeft={1}>
          <Button
            aria-label={timerEnd ? 'Stop timer' : 'Start timer'}
            onClick={timerEnd ? stopTimer : startTimer}
            variant="outlined"
          >
            {timerEnd ? 'Stop' : 'Start'}
          </Button>
        </Box>
      )}
    </Box>
  );
}
