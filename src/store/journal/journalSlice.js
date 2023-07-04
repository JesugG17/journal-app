import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savingMessage: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        isSavingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, {payload}) => {
            state.notes.push(payload);
            state.isSaving = false;
        },
        setActiveNote: (state, {payload}) => {
            state.activeNote = payload;
            state.savingMessage = '';   
        },
        setNotes: (state, {payload}) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.savingMessage = '';   
        },
        updateNote: (state, {payload}) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if (note.id === payload.id) {
                    return payload;
                }
                return note;
            })

            state.savingMessage = `Note updated successfully!`;
        },
        setPhotosToActiveNote: (state, {payload}) => {
            state.isSaving = false;
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
        },
        deleteNoteById: (state, {payload: id}) => {
            state.notes = state.notes.filter( note => note.id !== id);
            state.activeNote = null;
        },
        clearNotesOnLogout: (state) => {
            state.isSaving = false,
            state.savingMessage = '',
            state.notes = [],
            state.activeNote = null
    
        }
    }
});

export const { 
    addNewEmptyNote,
    deleteNoteById,
    isSavingNewNote,
    clearNotesOnLogout,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;