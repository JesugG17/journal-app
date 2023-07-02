import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseCloudStore } from '../../firebase/config';
import { addNewEmptyNote, isSavingNewNote, setActiveNote } from './journalSlice';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch( isSavingNewNote() );

        const { auth } = getState();
        const { uid } = auth
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()        
        };

        const newDoc = doc(collection(FirebaseCloudStore, `${uid}/journal/notes`)); 
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }   
}