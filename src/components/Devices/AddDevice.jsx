import React, {useEffect, useState} from "react";
import {Header} from "../index";
import Typography from "@mui/material/Typography";
import {Alert} from "@mui/lab";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "@mui/material/Button";
import {FETCH_ADD_DEVICE} from "../../config";
import {useNavigate} from 'react-router-dom';
import {fetch_post} from "../Utils/AuthenticationUtils";


const AddDevice = () => {

    const navigate = useNavigate();

    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [addDeviceSuccess, setAddDeviceSuccess] = useState(false);

    useEffect(() => {
        if (addDeviceSuccess)
            navigate('/devices')
    }, [addDeviceSuccess])

    const [state, setState] = useState({
        values: {
            interface: "TCP/IP",
            ip: '127.0.0.1',
            port: 5025,
            ethernetProtocol: 'TCP/SCIP',
            deviceType: 'Please Select!',
            parity: 'Even',
            stopBits: 'One',
            uartPort: '/dev/ttyUSB0',
            uartProtocol: 'raw'
        }
    });


    const sendDeviceConfig = async () => {
        await fetch_post(FETCH_ADD_DEVICE, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }, state).then((retData) => {
            if (retData.status === 'ok')
                setAddDeviceSuccess(true)
            else {
                setAlertMessage("Error wile sending to: " + FETCH_ADD_DEVICE)
                setAlertIsSet(true)
            }

        })
    };

    const handleChange = (name) => (event) => {
        console.log("🚀 ~ handleChange ~ event:", name, event.target.value);
        setState({values: {...state.values, [name]: event.target.value}});
    };
    const defineInputField = (label, value, value_name, type) => {
        return (
            <div className="flex">
        <span
            className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            style={{width: "125px", height: "3vh", marginRight: "2%"}}>
          {label}
        </span>
                <input
                    type={type}
                    id="website-admin"
                    className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={value}
                    onChange={handleChange(value_name)}
                />
            </div>
        );
    };

    const defineSelectField = (retValueName, optionList, label) => {
        return (
            <div className="relative z-0 w-full mb-6 group">
                <label htmlFor="underline_select" className="sr-only">
                    Underline select
                </label>
                <select
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    value={state.values[retValueName]}
                    onChange={handleChange(retValueName)}
                >
                    <option selected>{label}</option>
                    {optionList.map((option) => (
                        <option key={option.name} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)

    return (
        <div
            className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"
            style={{width: "50%"}}
        >
            <Header category="Dashboard" title="Add Device"/>
            <form
                onSubmit={(event) => {
                    event.preventDefault(); // Add this line to prevent the default form submission behavior
                    sendDeviceConfig().catch((error) => {
                        console.log('sendDeviceConfig caused an error : ', error);
                    });
                }}
            >
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_Title"
                        id="floating_Title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Device Name"
                        onChange={handleChange("title")}
                        required
                    />
                    <label
                        htmlFor="floating_Title"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    />
                </div>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    style={{paddingBottom: "1%"}}
                >
                    Interface Specification
                </Typography>
                <div className="relative z-0 w-full mb-6 group">
                    <div className="flex">
            <span
                style={{width: "150px", height: "3vh", marginRight: "2%"}}
                className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              Select Interface
            </span>
                        {defineSelectField(
                            "interface",
                            [{name: "TCP/IP"}, {name: "UART"}, {name: "USB"}],
                            "",
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 my-8">
                    {state.values["interface"] === "TCP/IP" && (
                        <React.Fragment>
                            {defineInputField("IP Address", state.values.ip, "ip", "string")}
                            {defineInputField("Port", state.values.port, "port", "number")}
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Protocol
                </span>
                                {defineSelectField(
                                    "ethernetProtocol",
                                    [
                                        {name: "TCP/SCIP"},
                                        {name: "TCP/Raw"},
                                        {name: "UDP/Raw"},
                                    ],
                                    "",
                                )}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["interface"] === "UART" && (
                        <React.Fragment>
                            {defineInputField(
                                "UART Interface",
                                state.values.uartPort,
                                "uart_port",
                                "string",
                            )}
                            {defineInputField(
                                "Baudrate",
                                state.values['baudrate'],
                                'baudrate',
                                'number'
                            )}
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Parity
                </span>
                                {defineSelectField(
                                    "parity",
                                    [{name: "None"}, {name: "Even"}, {name: "Odd"}],
                                    "",
                                )}
                            </div>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Stop Bits
                </span>
                                {defineSelectField(
                                    "stopBits",
                                    [{name: "One"}, {name: "Two"}],
                                    "",
                                )}
                            </div>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Protocol
                </span>
                                {defineSelectField("uartProtocol", [{name: "Raw"}], "")}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["interface"] === "USB" && (
                        <Alert severity={"warning"}>Currently not supported!</Alert>
                    )}
                </div>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    style={{paddingBottom: "1%"}}
                >
                    Device Specification
                </Typography>

                <div className="grid grid-cols-1 gap-4 my-8">
                    <div className="flex">
            <span
                style={{width: "150px", height: "3vh", marginRight: "2%"}}
                className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
            >
              Device Type
            </span>
                        {defineSelectField(
                            "deviceType",
                            [
                                {name: "SMU"},
                                {name: "DC Powersupply"},
                                {name: "Oscilloscope"},
                                {name: "Signal Generator"},
                                {name: "Microcontroller"},
                                {name: "FPGA"},
                                {name: "Custom"},
                            ],
                            "",
                        )}
                    </div>

                    {state.values["deviceType"] === "SMU" && (
                        <React.Fragment>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Device
                </span>
                                {defineSelectField(
                                    "device",
                                    [{name: "Tektronix 2600B Series SMU"}],
                                    "",
                                )}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["deviceType"] === "Oscilloscope" && (
                        <React.Fragment>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Device
                </span>
                                {defineSelectField(
                                    "device",
                                    [{name: "Keysight InfiniiVision 3000A X-Series"}],
                                    "",
                                )}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["deviceType"] === "DC Powersupply" && (
                        <React.Fragment>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Device
                </span>
                                {defineSelectField(
                                    "device",
                                    [{name: "Siglent SPD1305X"}],
                                    "",
                                )}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["deviceType"] === "Signal Generator" && (
                        <React.Fragment>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Device
                </span>
                                {defineSelectField("device", [{name: "Keysight 33500B"}], "")}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["deviceType"] === "Microcontroller" && (
                        <React.Fragment>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Device
                </span>
                                {defineSelectField(
                                    "device",
                                    [
                                        {name: "Raspberry Pi 3"},
                                        {name: "STMicroelectronics STM32f429"},
                                    ],
                                    "",
                                )}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["deviceType"] === "FPGA" && (
                        <React.Fragment>
                            <div className="flex">
                <span
                    style={{width: "150px", height: "3vh", marginRight: "2%"}}
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
                >
                  Device
                </span>
                                {defineSelectField(
                                    "device",
                                    [
                                        {name: "Zynq UltraScale+ MPSoC ZCU102 Evaluation Kit"},
                                        {name: "Digilent Atlys (Spartan-6)"},
                                    ],
                                    "",
                                )}
                            </div>
                        </React.Fragment>
                    )}

                    {state.values["deviceType"] === "Custom" && (
                        <React.Fragment>
                            {defineInputField("*IDN?", state.values["idn"], "idn", "string")}
                            {defineInputField(
                                "Category",
                                state.values['deviceCategory'],
                                "uart_port",
                                "string",
                            )}
                            <Button
                                startIcon={<UploadFileIcon/>}
                                variant="contained"
                                component="label"
                            >
                                Upload Device Configuration
                                <input
                                    hidden
                                    type="file"
                                    accept=".json"
                                    multiple
                                    onChange={handleChange("file")}
                                />
                            </Button>
                        </React.Fragment>
                    )}

                    <button
                        type="submit"
                        className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDevice;
