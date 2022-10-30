import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import heroImage from './hero.png';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box sx={{ display: { sm: 'flex' }, marginBottom: 4 }}>
      <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography
          component="h1"
          gutterBottom
          variant="h2"
          sx={{
            fontSize: {
              xs: theme.typography.h4.fontSize,
              sm: theme.typography.h3.fontSize,
              md: theme.typography.h2.fontSize,
            },
          }}
        >
          Create boards, columns, and items.
        </Typography>

        <Button
          color="primary"
          component={Link}
          size="large"
          sx={{ marginBottom: { sm: 2 } }}
          to="/boards"
          variant="contained"
        >
          Get started
        </Button>
      </Box>

      <CardMedia
        alt="Lilboards board with 3 columns and 6 items"
        component="img"
        image={heroImage}
        sx={{
          display: { xs: 'none', sm: 'block' },
          objectFit: 'contain',
          width: '50%',
        }}
      />
    </Box>
  );
}
