import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
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
        addNewEmptyNote: (state, action) => {

        },
        setActiveNote: (state, action) => {

        },
        setNotes: (state, action) => {
            
        },
        setSaving: (state, action) => {
            state.isSaving = true;   
        },
        updateNote: (state, action) => {
            
        },
        deleteNoteById: (state, action) => {
            
        }
    }
});

export const { 
    addNewEmptyNote,
    deleteNoteById ,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
} = journalSlice.actions;