import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import Breadcrumb from 'src/components/Breadcrumb';
import Heading from 'src/components/Heading';
import { useSetDocumentTitle } from 'src/hooks';
import type { Id } from 'src/types';

import { useList } from './hooks/useList';

export default function List() {
  const params = useParams<{ listId: Id }>();
  const listId = params.listId || '';
  const list = useList(listId);
  useSetDocumentTitle(list?.name || 'Untitled List');

  if (!listId || !list) {
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
