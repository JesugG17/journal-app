import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savingMessage: '',
        notes: [],
        activeNote: null
        // activeNote: {
        //     id: 'abc123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imageUrls: []
        // }
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
            // TODO: Mostrar mensaje de actualizacion
        },
        setPhotosToActiveNote: (state, {payload}) => {
            state.isSaving = false;
            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...payload];
        },
        deleteNoteById: (state, action) => {
            
        }
    }
});

export const { 
    addNewEmptyNote,
    deleteNoteById,
    isSavingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
} = journalSlice.actions;