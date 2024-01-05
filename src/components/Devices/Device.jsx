import React from 'react';


const DeviceStatus = ({state}) => {
    const getStatusColor = () => (state === 'online' ? '#83f28f' : '#FF0000');

    return (
        <button
            type="button"
            style={{background: getStatusColor()}}
            className="statusButton text-white py-1 px-2 capitalize rounded-2xl text-md"
        >
            {state}
        </button>
    );
};

export const AddTest = () => {
    const startTest = () => {
        alert("Currently not supported")
    };

    return (
        <button
            type="button"
            style={{background: 'Grey'}}
            className="text-white py-1 px-2 capitalize rounded-1xl text-md"
            onClick={() => startTest()}
        >
            Add
        </button>
    );
};

export const GetDeviceInfo = () => {

    return (
        <button
            type="button"
            style={{background: 'Grey'}}
            className="text-white py-1 px-2 capitalize rounded-1xl text-md"
            onClick={() => {
                alert('Currently not supportd')
            }}
        >
            Get Device Info
        </button>
    );
};

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

const Device = (props) => {
    const {id, name, type, protocol, port, status} = props;

    const deviceProtocolJsonToStr = (protocol) => deviceProtocolMap[protocol] || protocol;
    const deviceTypeJsonToStr = (devType) => deviceTypeMap[devType] || devType;

    const startTest = () => {
        console.log('Start test');
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
                <GetDeviceInfo />
            </td>
        </tr>
    );
};

export default Device;