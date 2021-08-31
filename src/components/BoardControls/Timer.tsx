import { useCallback, useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { DEFAULT_MINUTES, SECOND_IN_MILLISECONDS } from './constants';
import { formatTimeRemaining, minutesToMilliseconds } from './utils';

import type { ChangeEvent } from 'react';

const initialState = {
  minutes: DEFAULT_MINUTES,
  stopped: true,
  timerEnd: 0, // milliseconds
  value: String(DEFAULT_MINUTES),
};

export default function Timer() {
  const [state, setState] = useState(initialState);

  const stopTimer = useCallback(() => {
    setState({
      ...initialState,
      minutes: state.minutes,
      value: String(state.minutes),
    });
  }, [state.minutes]);

  useEffect(() => {
    if (state.stopped || !state.timerEnd) {
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= state.timerEnd) {
        clearInterval(interval);
        stopTimer();
        alert("⏰ Time's up!");
      } else {
        setState({
          ...state,
          value: formatTimeRemaining(state.timerEnd - now),
        });
      }
    }, SECOND_IN_MILLISECONDS);

    return () => {
      clearInterval(interval);
    };
  }, [state, setState, stopTimer]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setState({
      ...initialState,
      minutes: Number(value),
      value,
    });
  }

  function startTimer() {
    if (state.minutes > 0) {
      setState({
        ...state,
        stopped: false,
        timerEnd: Date.now() + minutesToMilliseconds(state.minutes),
      });
    }
  }

  return (
    <Box display="flex" alignItems="flex-end">
      <Box marginRight={1}>
        <TextField
          disabled={!state.stopped}
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
          type={state.stopped ? 'number' : 'text'}
          value={state.value}
        />
      </Box>

      <Button
        aria-label={state.stopped ? 'Start timer' : 'Stop timer'}
        onClick={state.stopped ? startTimer : stopTimer}
        variant="outlined"
      >
        {state.stopped ? 'Start' : 'Stop'}
      </Button>
    </Box>
  );
}
