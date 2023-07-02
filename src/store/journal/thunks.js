import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseCloudStore } from '../../firebase/config';
import { addNewEmptyNote, isSavingNewNote, setActiveNote, setNotes, setSaving, updateNote } from './journalSlice';
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

export const startUpdatingNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());
        const { auth, journal } = getState();
        const { uid } = auth;
        const { activeNote } = journal;
        if (!uid) throw new Error('uid is required');

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseCloudStore, `${uid}/journal/notes/${ activeNote.id }`)
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(activeNote));
    }
}