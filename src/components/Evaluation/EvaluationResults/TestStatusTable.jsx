import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import React from "react";

const TestStatusTable = ({identifier, startTime, stopTime}) => {
    return (
        <Table style={{width: '30%'}}>
            <tr>
                <td>
                    <Typography variant="body2" color="text.secondary">
                        <b>Test ID:</b>
                    </Typography>
                </td>
                <td>
                    <Typography variant="body2" color="text.secondary" style={{'margin-left': '2%'}}>
                        {identifier}
                    </Typography>
                </td>
            </tr>

            <tr>
                <td>
                    <Typography variant="body2" color="text.secondary">
                        <b>Start Time:</b>
                    </Typography>
                </td>
                <td>
                    <Typography variant="body2" color="text.secondary" style={{'margin-left': '2%'}}>
                        {startTime}
                    </Typography>
                </td>
            </tr>

            <tr>
                <td>
                    <Typography variant="body2" color="text.secondary">
                        <b>Finish Time:</b>
                    </Typography>
                </td>
                <td>
                    <Typography variant="body2" color="text.secondary" style={{'margin-left': '2%'}}>
                        {stopTime}
                    </Typography>
                </td>
            </tr>
        </Table>)
}

export default TestStatusTable;