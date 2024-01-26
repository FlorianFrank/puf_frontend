import React from 'react';
import {Header} from '..';
import DeviceTable from "./DeviceTable";


const Devices = () => {

        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Dashboard" title="Devices"/>
                <DeviceTable/>
            </div>
        );
    }
;

export default Devices;