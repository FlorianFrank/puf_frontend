import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import {Logout} from "@mui/icons-material";
import {GrCircleInformation} from "react-icons/gr";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useStateContext} from "../../contexts/ContextProvider";
import {FETCH_LOGOUT} from "../../config";

export default function MenuDropdown() {
    const navigate = useNavigate();
    const {setUserMenuVisible} = useStateContext();

    const returnToLoggingScreen = async () => {
        try {
            await axios.post(FETCH_LOGOUT, {
                refresh_token: localStorage.getItem('refresh_token')
            }, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });

            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
        } catch (e) {
            console.log('Logout not working', e);
        }

        navigate('/login');
    };

    return (
        <Paper sx={{position: 'absolute', maxWidth: '100%', marginLeft: '-5%', right: 0}}>
            <MenuList>
                <MenuItem>
                    <ListItemIcon>
                        <GrCircleInformation fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText onClick={() => {
                        setUserMenuVisible(false);
                        navigate('/versionInfo');
                    }}>Get Version Info</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘I
                    </Typography>
                </MenuItem>
                <Divider/>
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText onClick={() => {
                        returnToLoggingScreen().catch((errorMsg) => {
                            console.log('Error while calling returnToLoggingScreen ', errorMsg)
                        });
                        setUserMenuVisible(false);
                    }}>Logout</ListItemText>
                </MenuItem>
            </MenuList>
        </Paper>
    );
}
