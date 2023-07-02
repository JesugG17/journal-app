import SaveOutlined from '@mui/icons-material/SaveOutlined'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ImageGallery } from '../components/ImageGallery'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

export const NoteView = () => {

    const { activeNote } = useSelector(state => state.journal);
    const { formState, onInputChange } = useForm({
        ...activeNote
    });
    console.log(formState);
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>28 de agosto, 2023</Typography>
        </Grid>
        <Grid item>
            <Button color='primary' sx={{ padding: 2 }}>
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
