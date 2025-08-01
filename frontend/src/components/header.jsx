import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { AccountCircle } from '@mui/icons-material'
import Menu from '@mui/material/Menu';
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function Header() {
    const [menuOpen, setMenuOpen] = useState(null);
    const open = Boolean(menuOpen);

    const menuClickHandler = (event) => {
        setMenuOpen(event.currentTarget);
    }

    const menuCloseHandler = () => {
        setMenuOpen(null);
    }

    return (
        <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ color: "primary.main", fontSize: "40px", fontWeight: "900" }}>MovieMate</Typography>
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
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Header