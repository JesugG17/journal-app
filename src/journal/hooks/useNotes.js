import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { setActiveNote } from "../../store/journal/journalSlice";

export const useNotes = () => {
    
    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const journal = useSelector(state => state.journal);
    const { date, formState, onInputChange } = useForm(journal.activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

       
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (journal.savingMessage.length > 0) {
            Swal.fire(
                'Note updated', 
                journal.savingMessage, 
                'success');
        }
    }, [journal.savingMessage]);

    return {
        fileInputRef,
        formState,
        onInputChange,
        dateString,
        journal
    }
}
