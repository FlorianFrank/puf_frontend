import React, {useState} from 'react'
import Typography from "@mui/material/Typography";


const LoggingComponent = () => {

    const [optionList, setOptionList] = useState(['NATS Broker', 'PUF Backend'])
    const [logMessages, setLogMessages] = useState([])

    const logLevelStyle = (logLevel) => {
        switch (logLevel) {
            case 'INFO':
                return {paddingLeft: '10px', color: 'green'};
            case 'DEBUG':
                return {paddingLeft: '10px', color: 'black'};
            case 'ERROR':
                return {paddingLeft: '10px', color: 'red'};
            case 'WARNING':
                return {paddingLeft: '10px', color: 'orange'};
            default:
                return {paddingLeft: '10px', color: 'red'};
        }
    };


    function formatLogMessage() {
        const logLineRegex = /^(\d{2}:\d{2}:\d{2}) \[([^\]]+)\] (\S+\.py):(\d+) (\w+): (.+)$/;

        let ret = []

        logMessages.forEach((logLine) => {
            const match = logLine.match(logLineRegex);


            if (match) {
                const [_, timestamp, component, fileName, lineNumber, logLevel, message] = match;
                ret.push(
                    <table>
                        <tr>
                            <td style={{color: 'darkgrey'}}><i>{timestamp}</i></td>
                            <td style={{paddingLeft: '10px', color: 'darkgrey'}}>[{component}]</td>
                            <td style={logLevelStyle(logLevel)}>{logLevel}:</td>
                            <td style={{paddingLeft: '10px'}}>[{message}]</td>
                        </tr>
                    </table>
                )

            }
        })

        return ret;
    }

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={'NATS'}
                onChange={() => {
                }}
            >
                <option selected>{'TEST'}</option>
                {optionList.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <div style={{marginTop: 10}}>
                <Typography variant="subtitle1"><strong>Log Messages:</strong></Typography>
                <div style={{overflowY: 'auto', maxHeight: '15vh'}}>
                    {formatLogMessage()}
                </div>
            </div>
        </div>
    )
}

export default LoggingComponent;