import React, {useState} from 'react';

import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Card from '@mui/material/Card';

import Stack from '@mui/material/Stack';

import {styled} from '@mui/material/styles';

const AddTestTypeLayout = ({color, elements, type}) => {
    const [collapsibleOpen, setCollapsibleOpen] = useState(true);

    const StyledTable = styled(Table)(() => ({
        '&:last-child td, &:last-child th': {
            border: 0
        },
        borderColor: 'primary',
        marginTop: '5px'
    }));

    const StyledChip = styled(Card)(() => ({
        backgroundColor: color,
        width: '100%',
        marginTop: '5%'
    }));

    return (
        <React.Fragment>
            <Stack direction="row" spacing={1}>
                <StyledChip>
                    <h1 style={{
                        'font-size': '20px',
                        'font-weight': 'bold',
                        'color': 'white'
                    }}>{type}</h1>
                    <TableContainer component={Paper}>
                        <StyledTable aria-label="collapsible table">
                            <TableBody>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setCollapsibleOpen(!collapsibleOpen)}
                                >
                                    {collapsibleOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                </IconButton>
                                {collapsibleOpen && elements.map((element) => (
                                    <TableRow>
                                        {<div style={{
                                            'margin-left': '2%',
                                            'margin-right': '2%',
                                            'margin-bottom': "5%"
                                        }}>{element[1]}</div>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </StyledTable>
                    </TableContainer>
                </StyledChip>
            </Stack>


        </React.Fragment>
    );
};

export default AddTestTypeLayout;
