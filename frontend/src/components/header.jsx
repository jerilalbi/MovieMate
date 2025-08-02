import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { AccountCircle } from '@mui/icons-material'
import Menu from '@mui/material/Menu';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function Header(props) {
    const [menuOpen, setMenuOpen] = useState(null);
    const open = Boolean(menuOpen);
    const navigate = useNavigate();

    const menuClickHandler = (event) => {
        setMenuOpen(event.currentTarget);
    }

    const menuCloseHandler = () => {
        setMenuOpen(null);
    }

    return (
        <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography onClick={() => navigate('/')} variant="h6" sx={{ color: "primary.main", fontSize: "40px", fontWeight: "900", cursor: 'pointer' }}>MovieMate</Typography>
                <Box sx={{ display: "flex" }}>
                    <Box
                        onClick={() => props.page === 'add-movie' ? navigate('/') : navigate('/add-movie')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: '40px',
                            bgcolor: 'primary.main',
                            paddingX: '20px',
                            marginTop: '10px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            }
                        }}>
                        <Typography sx={{ fontWeight: '900', fontSize: '15px' }}>{props.page === 'add-movie' ? 'Go Home' : 'Add Movie / Show'}</Typography>
                    </Box>
                    <IconButton onClick={menuClickHandler}>
                        <AccountCircle sx={{ fontSize: "40px", color: "white" }} />
                    </IconButton>
                    <Menu
                        anchorEl={menuOpen}
                        open={open}
                        onClose={menuCloseHandler}
                        onClick={menuCloseHandler}
                        slotProps={{
                            paper: {
                                elevation: 2,
                                sx: {
                                    mt: 1.5,
                                    borderRadius: 2,
                                    minWidth: 140,
                                }
                            }
                        }}
                    >
                        <MenuItem>Watch Time</MenuItem>
                        <MenuItem>Wishlist</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header