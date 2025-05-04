import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { features } from './data';

export default function Features() {
  return (
    <Grid
      role="list"
      container
      spacing={2}
      sx={{ marginBottom: 2, textAlign: 'center' }}
    >
      {features.map(({ icon: Icon, heading, description }, index) => (
        <Grid
          role="listitem"
          key={index}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
        >
          <Icon color="primary" fontSize="large" />

          <Typography component="h2" variant="h5" gutterBottom>
            {heading}
          </Typography>

          <Typography paragraph>{description}</Typography>
        </Grid>
      ))}
    </Grid>
  );
}
