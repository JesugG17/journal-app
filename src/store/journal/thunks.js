import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseCloudStore } from '../../firebase/config';
import { addNewEmptyNote, isSavingNewNote, setActiveNote, setNotes, updateNote } from './journalSlice';
import { loadNotes } from '../../journal/utils';

export const startNewNote = () => {
    return async( dispatch, getState ) => {
        
        dispatch( isSavingNewNote() );

        const { auth } = getState();
        const { uid } = auth;
        
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

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        const { auth } = getState();
        const { uid } = auth
        if (!uid) throw new Error('uid is required');

        const notes = await loadNotes(uid);
        
        dispatch(setNotes(notes));
        
    }
}

export const startUpdatingNote = ( newNote ) => {
    return async(dispatch, getState) => {

        const { auth, journal } = getState();
        const { uid } = auth;
        const { id } = journal.activeNote;
        if (!uid) throw new Error('uid is required');

        const collectionRef = collection(FirebaseCloudStore, `${uid}/journal/notes/${ id }`);
        await updateDoc(collectionRef);

        dispatch(updateNote(newNote));
    }
}