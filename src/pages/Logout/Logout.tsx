import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logEvent, signOut } from '../../firebase';
import { useDispatch, useSetDocumentTitle } from '../../hooks';
import { resetActions } from '../../store';

export default function Logout() {
  const dispatch = useDispatch();
  useSetDocumentTitle('Logout');
  const navigate = useNavigate();

  useEffect(() => {
    resetActions.forEach((resetAction) => dispatch(resetAction()));

    signOut().then(() => {
      navigate('/login');
      logEvent('logout');
    });
  }, [dispatch, navigate]);

  return null;
}
