import { IconButton } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { startNewNote } from '../../store/journal/thunks'

export const JournalPage = () => {

  const dispatch = useDispatch();
  const { isSaving, activeNote } = useSelector(state => state.journal);
  
  const onNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ducimus cumque molestias natus in harum esse quasi, sint deserunt inventore doloribus iure a quis odit perspiciatis alias vitae, tempora praesentium!</Typography> */}
      
      {
        activeNote
        ? <NoteView />
        : <NothingSelectedView />
      }

      <IconButton
        disabled={ isSaving }
        onClick={onNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

      
    </JournalLayout>
  )
}
