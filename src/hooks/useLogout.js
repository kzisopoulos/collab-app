import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
export const useLogout = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      // update the user online
      const { uid } = user;

      const docRef = doc(projectFirestore, 'users', uid);
      await updateDoc(docRef, { online: false });

      await signOut(projectAuth);
      // dispatch the logout action
      dispatch({ type: 'LOGOUT' });
      if (!isCanceled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCanceled) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      return setIsCanceled(true);
    };
  }, []);

  return { logout, error, isPending };
};
