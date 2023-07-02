import SaveOutlined from '@mui/icons-material/SaveOutlined'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components/ImageGallery'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo } from 'react'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startUpdatingNote } from '../../store/journal/thunks'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { activeNote, savingMessage } = useSelector(state => state.journal);
    const { title, body, date, formState, onInputChange } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    const onSaveNote = (event) => {
        event.preventDefault();
        dispatch(startUpdatingNote());
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
            <Button onClick={ onSaveNote} color='primary' sx={{ padding: 2 }}>
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
                value={ formState.body }
                name='body'
                onChange={onInputChange}
                fullWidth
                multiline
                placeholder='¿Que sucedio el dia de hoy?'
                minRows={ 5 }
            />

            <ImageGallery />
        </Grid>
    </Grid>
  )
}
