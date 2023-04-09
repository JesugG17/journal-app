import { JournalLayout } from '../layout/JournalLayout'
import { NoteView, NothingSelectedView } from '../views'

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ducimus cumque molestias natus in harum esse quasi, sint deserunt inventore doloribus iure a quis odit perspiciatis alias vitae, tempora praesentium!</Typography> */}
      
      {/* <NothingSelectedView /> */}
      
      <NoteView />
      
    </JournalLayout>
  )
}
