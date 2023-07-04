
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { UploadOutlined, SaveOutlined, DeleteOutline } from '@mui/icons-material';

import { ImageGallery } from '../components/ImageGallery'
import { NoImage } from '../components/NoImage';

import { useNotesActions, useNotes } from '../hooks';

export const NoteView = () => {

    const { onSaveNote, onFileInputChange, onDelete } = useNotesActions();
    const {
        fileInputRef,
        journal,
        formState,
        onInputChange,
        dateString    
    } = useNotes();
    
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
                disabled={ journal.isSaving }
                onClick={() => fileInputRef.current.click()}
            >
                <UploadOutlined />
            </IconButton>
            <Button 
                onClick={ onSaveNote} 
                color='primary'
                disabled={ journal.isSaving } 
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
                journal.activeNote.imageUrls.length === 0
                ? <NoImage />
                : <ImageGallery images={ journal.activeNote.imageUrls }/>
            }
          
        </Grid>

    </Grid>
  )
}
