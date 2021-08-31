import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Timer() {
  return (
    <Box display="flex" alignItems="flex-end">
      <Box marginRight={1}>
        <TextField
          defaultValue={5}
          inputProps={{
            min: 1,
            max: 1e6,
          }}
          label="Timer"
          placeholder="Minutes"
          size="small"
          type="number"
        />
      </Box>

      <Button variant="outlined">Start</Button>
    </Box>
  );
}
