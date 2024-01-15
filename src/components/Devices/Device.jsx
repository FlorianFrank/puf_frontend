import React from 'react';


const COLORS = {
    online: '#83f28f',
    offline: '#FF0000',
    grey: 'Grey',
};

const DeviceStatus = ({state}) => {
    const getStatusColor = () => COLORS[state] || COLORS.offline;

    return (
        <Button
            style={{background: getStatusColor()}}
            className="statusButton text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
            {state}
        </Button>
    );
};

const Button = ({style, className, onClick, children}) => (
    <button type="button" style={{...style}} className={className} onClick={onClick}>
        {children}
    </button>
);

export const AddTest = ({ startTest }) => (
    <Button style={{ background: COLORS.grey }} className="text-white py-1 px-2 capitalize rounded-1xl text-md" onClick={startTest}>
        Add
    </Button>
);

export const GetDeviceInfo = () => (
    <Button style={{background: COLORS.grey}} className="text-white py-1 px-2 capitalize rounded-1xl text-md"
            onClick={() => alert('Currently not supported')}>
        Get Device Info
    </Button>
);

const deviceProtocolMap = {
    tcp_ip: 'TCP/IP',
    uart: 'UART',
    spi: 'SPI',
};

const deviceTypeMap = {
    nanosec_container: 'NanoSec Container',
    oscilloscope: 'Oscilloscope',
    smu: 'SMU',
};

const Device = ({id, name, type, protocol, port, status}) => {
    const deviceProtocolJsonToStr = (protocol) => deviceProtocolMap[protocol] || protocol;
    const deviceTypeJsonToStr = (devType) => deviceTypeMap[devType] || devType;

    const startTest = () => {
        alert('Currently not supported');
    };

    return (
        <tr className="templateRow">
            <td className="text-center">{id}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{deviceTypeJsonToStr(type)}</td>
            <td className="text-center">{deviceProtocolJsonToStr(protocol)}</td>
            <td className="text-center">{port}</td>
            <td className="text-center">
                <DeviceStatus state={status}/>
            </td>
            <td className="text-center">
                <AddTest startTest={startTest}/>
            </td>
            <td className="text-center">
                <GetDeviceInfo/>
            </td>
        </tr>
    );
};

export default Device;