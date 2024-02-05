import React, { useEffect, useState } from 'react';  // Import React, useEffect, and useState from 'react' directly
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert } from '@mui/lab';
import LoadingClip from '../../Utils/LoadingClip';
import { fetch_get } from '../../Utils/AuthenticationUtils';
import { FETCH_SERVER_INFO } from '../../../config';



function ServerInfo() {
    const [serverInfoRows, setServerInfoRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fetchServerInfo = async () => {
        await fetch_get(FETCH_SERVER_INFO, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                setServerInfoRows(retData.serverinfo);
                setLoading(false)
            }
        })
    };


    useEffect(() => {
        fetchServerInfo().catch((error) => {
            console.log('fetchDevices caused an exception', error)
        })
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (alertIsSet) {
        return <div><Alert severity="error">{alertMessage}</Alert></div>;
    }

    if (loading) {
        return <LoadingClip />;
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Property</TableCell>
                        <TableCell align="left">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serverInfoRows.map((row) => (
                        <TableRow
                            key={row.property}
                            sx={{ paddingTop: 0, paddingBottom: 0 }}
                        >
                            <TableCell sx={{ paddingTop: 0.8, paddingBottom: 0 }} align="left">{row.property}</TableCell>
                            <TableCell sx={{ paddingTop: 0.8, paddingBottom: 0 }} align="left">{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ServerInfo;