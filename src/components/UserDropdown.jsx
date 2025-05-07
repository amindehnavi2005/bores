"use client";
import React, { useState } from 'react'
import { logout } from '@/lib/routes/auth';
import { Button, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

export const UserDropdown = ({ user }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleMenu}
                variant='contained'
                color='inherit'
                style={{ borderRadius: "100px", gap: "2px" }}
            >
                <AccountCircle color='action' />
                <span className='text-black'>
                    {user.username}
                </span>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>پروفایل</MenuItem>
                <MenuItem onClick={() => { logout(); handleClose(); }}>خروج</MenuItem>
            </Menu>
        </>
    )
}
