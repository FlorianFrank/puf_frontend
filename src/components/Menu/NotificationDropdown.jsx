import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import {AiFillCheckSquare} from "react-icons/ai";

export default function NotificationDropdown() {

    return (
        <Paper sx={{position: 'absolute', maxWidth: '100%', marginLeft: '-15%', right: 0}}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <AiFillCheckSquare fontSize="large" />
                    </ListItemIcon>
                    <ListItemText>Icon</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}