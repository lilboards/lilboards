import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from 'src/components/Breadcrumb';
import Heading from 'src/components/Heading';
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
      <Breadcrumb to="/lists">Lists</Breadcrumb>

      <Heading link>{list.name}</Heading>

      <Typography>Coming soon.</Typography>
    </>
  );
}
