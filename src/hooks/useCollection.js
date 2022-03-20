import { useState, useEffect, useRef } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
export const useCollection = (theCollection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    let ref = collection(projectFirestore, theCollection);

    if (query) {
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError('Could not fetch the data');
      }
    );

    // unsubscribe on unamount
    return () => unsub();
  }, [theCollection, query, orderBy]);

  return { documents, error };
};
