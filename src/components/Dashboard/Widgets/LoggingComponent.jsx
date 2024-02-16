import React, {useEffect, useState} from 'react'
import Typography from "@mui/material/Typography";
import {fetch_get} from "../../Utils/AuthenticationUtils";
import {FETCH_LOG_MESSAGES, FETCH_LOGGING_CATEGORIES} from "../../../config";
import {Alert} from "@mui/lab";

const LoggingComponent = () => {

    const [optionList, ] = useState([
        {title: 'all', label: 'ALL'},
        {title: 'GenericMessagingServer', label: 'GenericMessagingServer'},
        {title: 'DeviceManager', label: 'DeviceManager'},
        {title: 'Dashboard', label: 'Dashboard'},
        {title: 'Evaluation', label: 'Evaluation'}])

    const [selectedOption, setSelectedOption] = useState('ALL')
    const [selectedLogLevel, setSelectedLogLevel] = useState('DEBUG')


    const [loggingCategories, setLoggingCategories] = useState([])
    const [logMessages, setLogMessages] = useState([])

    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fetchLoggingCategories = async () => {
        await fetch_get(FETCH_LOGGING_CATEGORIES, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            setLoggingCategories(retData['categories'])
        })
    };


    const fetchLogMessages = async (logCategory, logLevel) => {
        await fetch_get(FETCH_LOG_MESSAGES + '?log_category=' + logCategory +'&log_type='+
            logLevel+'&message_count=10', (value) => {
            setAlertIsSet(value)
        }, (value) => {

            setAlertMessage(value)
        }).then((retData) => {
            console.log('LOG MSG', retData['logMessages'])
            setLogMessages(retData['logMessages'])
        })
    };

    useEffect(() => {
        fetchLogMessages(selectedOption, selectedLogLevel).catch(() => {
            setAlertMessage('Error while calling fetchLogMessages')
        })

        fetchLoggingCategories().catch(() => {
            setAlertMessage('Error while calling fetchLoggingCategories')
        })
    }, [])

    const logLevelStyle = (logLevel) => {
        switch (logLevel) {
            case 'INFO':
                return {paddingLeft: '10px', color: 'green', minWidth: '100px'};
            case 'DEBUG':
                return {paddingLeft: '10px', color: 'black', minWidth: '100px'};
            case 'ERROR':
                return {paddingLeft: '10px', color: 'red', minWidth: '100px'};
            case 'WARNING':
                return {paddingLeft: '10px', color: 'orange', minWidth: '100px'};
            default:
                return {paddingLeft: '10px', color: 'red', minWidth: '100px'};
        }
    };


    function formatLogMessage() {
        const logLineRegex = /^(\d{2}:\d{2}:\d{2}) \[([^\]]+)] (\S+\.py):(\d+) (\w+): (.+)$/;

        let ret = []

        logMessages.forEach((logLine) => {
            const match = logLine.match(logLineRegex);


            if (match) {
                const [, timestamp, component, filename, lineNr, logLevel, message] = match;
                ret.push(
                    <table>
                        <tr>
                            <td style={{color: 'darkgrey'}}><i>{timestamp}</i></td>
                            <td style={{paddingLeft: '10px', minWidth: '20vh', color: 'darkgrey'}}>[{component}]</td>
                            <td style={logLevelStyle(logLevel)}>{logLevel}:</td>
                            <td>{message}</td>
                        </tr>
                    </table>
                )

            }
        })

        return ret;
    }

    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)


    return (
        <React.Fragment>
            <Typography variant="h7">Filter measurements</Typography>
            <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={selectedOption}
                onChange={(event) => {
                    setSelectedOption(event.target.value);
                    fetchLogMessages(event.target.value, selectedLogLevel);
                }}
            >
                <option selected>{selectedOption}</option>
                {loggingCategories.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={selectedLogLevel}
                onChange={(event) => {
                    setSelectedLogLevel(event.target.value);
                    fetchLogMessages(selectedOption, event.target.value);
                }}
            >
                <option selected>{selectedLogLevel}</option>
                {['DEBUG', 'INFO', 'WARNING', 'ERROR'].map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>


            <div style={{marginTop: 10}}>
                <Typography variant="h7">Log Messages:</Typography>
                <div style={{overflowY: 'auto', maxHeight: '15vh'}}>
                    {formatLogMessage()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoggingComponent;