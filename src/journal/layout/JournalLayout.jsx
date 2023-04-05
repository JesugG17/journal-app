import { Box } from '@mui/material'
import { Navbar } from '../components/Navbar';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        {/* Navbar drawerWitdh */}
        <Navbar drawerWidth={ drawerWidth }/>

        {/* Sidebar drawerWitdh */}

        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3}}
        >
            {/* Toolbar */}
            
            { children }

        </Box>

    </Box>
  )
}
