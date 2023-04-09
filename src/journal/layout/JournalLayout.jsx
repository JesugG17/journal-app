import { Box, Toolbar } from '@mui/material'
import { Navbar, Sidebar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        <Navbar drawerWidth={ drawerWidth }/>

        {/* Sidebar drawerWitdh */}
        <Sidebar drawerWidth={ drawerWidth }/>

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 2 }}
        >
            <Toolbar />
            
            { children }

        </Box>

    </Box>
  )
}
