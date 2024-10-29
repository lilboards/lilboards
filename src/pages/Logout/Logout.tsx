import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logEvent, signOut } from 'src/firebase';
import { useDispatch, useSetDocumentTitle } from 'src/hooks';
import { resetActions } from 'src/store';

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
