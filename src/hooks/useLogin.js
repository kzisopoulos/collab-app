import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
export const useLogin = () => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await signInWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      // update the online status

      const docRef = doc(projectFirestore, 'users', res.user.uid);
      await updateDoc(docRef, { online: true });
      // dispatch the logout action
      dispatch({ type: 'LOGIN', payload: res.user });
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

  return { login, error, isPending };
};
