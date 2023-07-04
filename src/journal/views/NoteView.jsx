import { useEffect, useMemo, useRef } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Icon, IconButton, TextField, Typography } from '@mui/material'
import { UploadOutlined, SaveOutlined, DeleteOutline } from '@mui/icons-material';
import 'sweetalert2/dist/sweetalert2.css';
import Swal from 'sweetalert2'

import { ImageGallery } from '../components/ImageGallery'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startUpdatingNote, startUploadingFiles } from '../../store/journal/thunks'
import { NoImage } from '../components/NoImage';

export const NoteView = () => {

    const fileInputRef = useRef();
    const dispatch = useDispatch();
    const { activeNote, savingMessage, isSaving } = useSelector(state => state.journal);
    const { date, formState, onInputChange } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const onSaveNote = (event) => {
        event.preventDefault();
        dispatch(startUpdatingNote());
    }

    const onFileInputChange = ({target}) => {
        if (!target.files || target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = async() => {
        const { isConfirmed } = await Swal.fire({
            title: 'Are you sure that you want to delete it?',
            text: 'This action cant not be undone later...',
            icon: 'error',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: 'green',
            cancelButtonColor: 'red'
        });
        if (!isConfirmed) return;
        dispatch(startDeletingNote());
    }

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (savingMessage.length > 0) {
            Swal.fire(
                'Note updated', 
                savingMessage, 
                'success');
        }
    }, [savingMessage]);

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>
            <input 
                multiple
                type='file'
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={() => fileInputRef.current.click()}
            >
                <UploadOutlined />
            </IconButton>
            <Button 
                onClick={ onSaveNote} 
                color='primary'
                disabled={ isSaving } 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>
        <Grid container direction='column'>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                label='Titulo'
                value={formState.title}
                name='title'
                onChange={onInputChange}
                placeholder='ingrese un titulo'
                sx={{  mb: 1 }}
            />
            <TextField 
                type='text'
                variant='filled'
                value={formState.body}
                name='body'
                onChange={onInputChange}
                fullWidth
                multiline
                placeholder='¿Que sucedio el dia de hoy?'
                minRows={ 5 }
            />
            <Grid container justifyContent='end'>
                <Button
                    onClick={ onDelete }
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            {
                activeNote.imageUrls.length === 0
                ? <NoImage />
                : <ImageGallery images={ activeNote.imageUrls }/>
            }
          
        </Grid>

    </Grid>
  )
}
