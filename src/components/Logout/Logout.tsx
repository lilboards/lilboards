import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { resetActions } from '../../actions';
import { logEvent, signOut } from '../../firebase';
import { useDispatch, useSetDocumentTitle } from '../../hooks';

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
