import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/components/Breadcrumb';
import Heading from 'src/components/Heading';
import { useIsLoggedIn, useSetDocumentTitle } from 'src/hooks';
import type { Id } from 'src/types';

import { useList } from './hooks/useList';

export default function List() {
  const params = useParams<{ listId: Id }>();
  const listId = params.listId || '';
  const list = useList(listId);
  useSetDocumentTitle(list?.name || 'Untitled List');
  const isLoggedIn = useIsLoggedIn();

  if (!listId || !list) {
    return null;
  }

  return (
    <>
      {isLoggedIn && <Breadcrumb to="/lists">Lists</Breadcrumb>}

      <Heading link>{list.name}</Heading>

      <Typography>Coming soon.</Typography>
    </>
  );
}
