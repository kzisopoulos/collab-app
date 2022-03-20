import { useEffect, useState } from 'react';

import { projectFirestore } from '../firebase/config';

import { onSnapshot, doc } from 'firebase/firestore';

export const useDocument = (theCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime data for document:

  useEffect(() => {
    const docRef = doc(projectFirestore, theCollection, id);

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError('No such document exists.');
        }
      },
      (error) => {
        console.log(error.message);
        setError('Failed to get document');
      }
    );
    return () => {
      unsub();
    };
  }, [theCollection, id]);

  return { document, error };
};
