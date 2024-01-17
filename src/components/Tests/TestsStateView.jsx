import React, {useState, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {Header} from '../index';
import {Alert} from "@mui/lab";
import {FETCH_TEST_STATE} from "../../config";
import LoadingClip from "../Utils/LoadingClip";
import {fetch_get} from "../Utils/AuthenticationUtils";

const TestsStateView = ({test_state}) => {
    const [alertState, setAlertState] = useState(null);
    const [testsListWaiting, setTestsListWaiting] = useState([]);
    const [testsListRunning, setTestsListRunning] = useState([]);
    const [testsListCompleted, setTestsListCompleted] = useState([]);

    const [loading, setLoading] = useState(true);
    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        requestTestState('waiting')
        requestTestState('running')
        requestTestState('finished')
    }, []);

    function requestTestState(testState) {
        requestTests(testState).then((result) => {
            console.log(`requestTests returned ${result}`)
        })
            .catch((error) => {
                console.error(`requestTests returned ${error}`)
            });
    }

    let requestTests = async (test_state) => {
        const data = await
            fetch_get(FETCH_TEST_STATE + test_state, (value) => {
                setAlertIsSet(value)
            }, (value) => {
                setAlertMessage(value)
            })
        if (data) {
            setLoading(false)
            const receivedTests = Object.values(data).reduce(
                (acc, array) => acc.concat(array),
                []
            );
            console.log(
                '🚀 ~ file: TestView.jsx:29 ~ request tests at state ' + test_state,
                receivedTests
            );
            if (test_state === 'waiting')
                setTestsListWaiting(receivedTests);
            else if (test_state === 'running')
                setTestsListRunning(receivedTests);
            else if (test_state === 'finished')
                setTestsListCompleted(receivedTests);
        }
    };


    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));

    function getTestsList(testState) {
        if (testState === 'waiting')
            return testsListWaiting;
        else if (testState === 'running')
            return testsListRunning;
        else if (testState === 'finished')
            return testsListCompleted;
    }

    if (alertIsSet)
        return (
            <div><Alert severity="error">{alertMessage}</Alert></div>
        );
    if (loading)
        return (<LoadingClip/>);
    else
        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
                {(alertState) ? alertState : ''}
                <Header category="Tests" title={
                    (test_state === 'waiting') ? "Waiting Tests" : ((test_state === 'running') ? "Running Tests" : "Completed Tests")
                }/>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="left">Title</StyledTableCell>
                                <StyledTableCell align="left">Type</StyledTableCell>
                                <StyledTableCell align="left">Device</StyledTableCell>
                                <StyledTableCell align="left">Iteration</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {getTestsList(test_state).map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.title}</StyledTableCell>
                                    <StyledTableCell align="left">{row.testType}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.device}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.iteration}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {row.status}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
};

export default TestsStateView;
