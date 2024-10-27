import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  to: string;
  children: string;
}

export default function Breadcrumb(props: Props) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        color="inherit"
        component={RouterLink}
        sx={{ alignItems: 'center', display: 'flex' }}
        to={props.to}
        underline="hover"
      >
        <ArrowBackIosIcon fontSize="inherit" />
        {props.children}
      </Link>
    </Breadcrumbs>
  );
}
