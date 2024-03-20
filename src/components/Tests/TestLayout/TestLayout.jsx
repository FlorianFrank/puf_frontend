import React, {useEffect, useState} from 'react';
import {useStateContext} from "../../../contexts/ContextProvider";
import {styled} from "@mui/material/styles";
import {
    TableHead, Table, Chip, Stack,
    TableContainer, Paper, TableRow,
    TableCell, TableBody, Alert
} from "@mui/material";
import RowCNTTestTemplate from "./RowCNTTestTemplate";
import RowMemoryTestTemplate from "./RowMemoryTestTemplate";
import RowGenericTestTemplate from "./RowGenericTestTemplate";

const TestLayout = ({color, category, type}) => {
    const {testTemplates} = useStateContext();
    const [tests, setTests] = useState([]);

    useEffect(() => {
        setTests(testTemplates.filter(t => t['testType'] === type));
    }, [testTemplates, type]);

    const StyledTableHead = styled(TableHead)(({_theme}) => ({
        backgroundColor: color
    }));

    const StyledTable = styled(Table)(({_theme}) => ({
        '&:last-child td, &:last-child th': {
            border: 0
        },
        borderColor: 'primary',
        marginTop: '5px'
    }));

    const StyledChip1 = styled(Chip)(({_theme}) => ({
        borderColor: color
    }));

    const StyledChip2 = styled(Chip)(({_theme}) => ({
        backgroundColor: color
    }));

    return (
        <React.Fragment>
            <Stack direction="row" spacing={1}>
                <StyledChip1 label={tests.length} variant="outlined"/>
                <StyledChip2 label={type}/>
            </Stack>
            {tests.length !== 0 ? (
                <TableContainer component={Paper}>
                    <StyledTable aria-label="collapsible table">
                        <StyledTableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Test Type</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </StyledTableHead>

                        <TableBody>
                            {tests.map((test) => (
                                <RowGenericTestTemplate key={test.id} row={test}/>
                            ))}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            ) : (
                <Alert severity="info">
                    This is an info alert — No records to display!
                </Alert>
            )}
        </React.Fragment>
    );
};

export default TestLayout;
