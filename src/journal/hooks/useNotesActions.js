import { useDispatch } from "react-redux";
import { startUpdatingNote, startUploadingFiles, startDeletingNote } from '../../store/journal'
import Swal from "sweetalert2";

export const useNotesActions = () => {
    
    const dispatch = useDispatch();

    const onSaveNote = (event) => {
        event.preventDefault();
        dispatch(startUpdatingNote());
    }

    const onFileInputChange = ({ target }) => {
        if (!target.files || target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = async () => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure that you want to delete it?',
            text: 'This action can not be undone later...',
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red'
        });
        if (!isConfirmed) return;
        dispatch(startDeletingNote());
    }

    return {
        onSaveNote,
        onFileInputChange,
        onDelete
    }

}
