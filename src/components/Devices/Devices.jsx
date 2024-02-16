import React from 'react';
import {Header} from '..';
import DeviceTable from "./DeviceTable";
import {Button} from "@mui/material";

import {useNavigate} from 'react-router-dom';

const Devices = () => {

        const navigate = useNavigate();

        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Dashboard" title="Devices"/>
                <DeviceTable/>
                <Button style={{ paddingTop: '2%'}}
                        className="text-white py-1 px-2 capitalize rounded-1xl text-md"
                        onClick={() => {navigate('/addDevice')}}>
                    Add Device manually
                </Button>
            </div>
        );
    }
;

export default Devices;