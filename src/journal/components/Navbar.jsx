import { useDispatch } from 'react-redux'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlined from '@mui/icons-material/MenuOutlined'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import { startLogout } from '../../store/auth'

export const Navbar = ({ drawerWidth = 240, setOpen }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }

  return (
    <AppBar 
        position='fixed'
        sx={{
            width: {sm: `calc(100% - ${ drawerWidth }px)`},
        }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                onClick={() => setOpen((prevState) => !prevState)}
                edge='start'
                sx={{ mr: 2, display: { sm: 'none'}}}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>JournalApp</Typography>
                <IconButton onClick={onLogout} color='error'>
                    <LogoutOutlined />
                </IconButton>
            </Grid>
        </Toolbar>

    </AppBar>    
  )
}
