import { Box, Toolbar } from '@mui/material'
import { Navbar, Sidebar } from '../components';
import { useState } from 'react';

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>

        <Navbar 
          drawerWidth={ drawerWidth }
          setOpen={ setOpen }
        />

        <Sidebar 
          drawerWidth={ drawerWidth }
          setOpen={ setOpen }
          open={ open }
        />

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
