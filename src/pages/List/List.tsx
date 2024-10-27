import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useSetDocumentTitle } from 'src/hooks';
import type { Id } from 'src/types';

import { useList } from './hooks/useList';

export default function List() {
  const params = useParams<{ listId: Id }>();
  const listId = params.listId || '';
  const { list, isLoaded } = useList(listId);
  useSetDocumentTitle(list?.name || 'Untitled List');
  const navigate = useNavigate();

  useEffect(() => {
    // list not found
    if (listId && !list && isLoaded) {
      navigate('/404');
    }
  }, [listId, list, isLoaded, navigate]);

  // no list id
  if (!listId) {
    return null;
  }

  // list not found
  if (listId && !list && isLoaded) {
    return null;
  }

  // no list
  if (!list) {
    return null;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          component={RouterLink}
          sx={{ alignItems: 'center', display: 'flex' }}
          to="/lists"
          underline="hover"
        >
          <ArrowBackIosIcon fontSize="inherit" />
          Lists
        </Link>
      </Breadcrumbs>

      <Typography component="h1" gutterBottom variant="h4">
        {list.name}
      </Typography>

      <Typography>Coming soon.</Typography>
    </>
  );
}
