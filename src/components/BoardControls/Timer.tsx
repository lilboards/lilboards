import { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import actions from '../../actions';
import { useDispatch, useSelector } from '../../hooks';

import { DEFAULT_MINUTES, SECOND_IN_MILLISECONDS } from './constants';
import { formatTimeRemaining, minutesToMilliseconds } from './utils';

import type { ChangeEvent } from 'react';
import type { Id } from '../../types';

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
    dispatch(
      actions.updateBoard({
        boardId,
        board: {
          timerEnd: 0,
        },
      })
    );
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
    if (state.minutes > 0) {
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

  return (
    <Box display="flex" alignItems="flex-end">
      <Box marginRight={1}>
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
      </Box>

      <Button
        aria-label={timerEnd ? 'Stop timer' : 'Start timer'}
        onClick={timerEnd ? stopTimer : startTimer}
        variant="outlined"
      >
        {timerEnd ? 'Stop' : 'Start'}
      </Button>
    </Box>
  );
}
