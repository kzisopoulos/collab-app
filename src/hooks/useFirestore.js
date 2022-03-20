import { useState, useReducer, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null };
    case 'ADDED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'DELETED_DOCUMENT':
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case 'UPDATED_DOCUMENT':
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case 'ERROR':
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (theCollection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection reference
  const ref = collection(projectFirestore, theCollection);

  // only dispatch if not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };
  // add a document to collection
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const createdAt = serverTimestamp();
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: 'ADDED_DOCUMENT',
        payload: addedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
    }
  };

  // delete a document from the collection
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const theRef = doc(projectFirestore, theCollection, id);
      await deleteDoc(theRef);
      dispatchIfNotCancelled({
        type: 'DELETED_DOCUMENT',
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'Could not delete' });
    }
  };

  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });
    try {
      const docRef = doc(projectFirestore, theCollection, id);

      const updatedDocument = await updateDoc(docRef, updates);
      dispatchIfNotCancelled({
        type: 'UPDATED_DOCUMENT',
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (error) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
      return null;
    }
  };

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};
