import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import React from "react";
import TableContainer from "@mui/material/TableContainer";
import {StyledTableRow, StyledTableCell, StyledCheckbox} from "../../../../Utils/StyledComponents";


const MeasurementTemplate = ({connectedMeasurements, setExpanded, expanded}) => {

    return (<TableContainer component={Paper}>
        <Table sx={{width: '100%'}} aria-label="customized table">
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell align="left">
                        ID
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Test Type
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Test Name
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Wafer
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Row
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Column
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        PUF ID
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Row on PUF
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Column on PUF
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Temperature
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Iterations
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Selected Iteration
                    </StyledTableCell>

                    <StyledTableCell align="center" rowSpan={2}>
                        <StyledCheckbox
                            indeterminate={
                                true
                            }
                            checked={
                                true
                            }
                            onChange={() => {
                                setExpanded(!expanded)
                            }}
                        />{' '}
                    </StyledTableCell>
                </StyledTableRow>
            </TableHead>
            {(expanded) ? <TableBody>
                {connectedMeasurements.map((measurement) => (
                    <StyledTableRow>
                        <React.Fragment>
                            <StyledTableCell key={0} align="left">
                                {measurement['id']}
                            </StyledTableCell>
                            <StyledTableCell key={1} align="left">
                                {measurement['testType']}
                            </StyledTableCell>
                            <StyledTableCell key={1} align="left">
                                {measurement['testTitle']}
                            </StyledTableCell>
                            <StyledTableCell key={2} align="left">
                                {measurement['wafer']}
                            </StyledTableCell>
                            <StyledTableCell key={3} align="left">
                                {measurement['row']}
                            </StyledTableCell>
                            <StyledTableCell key={4} align="left">
                                {measurement['column']}
                            </StyledTableCell>
                            <StyledTableCell key={5} align="left">
                                {measurement['pufID']}
                            </StyledTableCell>
                            <StyledTableCell key={6} align="left">
                                {measurement['rowOnPUF']}
                            </StyledTableCell>
                            <StyledTableCell key={7} align="left">
                                {measurement['columnOnPUF']}
                            </StyledTableCell>
                            <StyledTableCell key={8} align="left">
                                {measurement['temperature']}
                            </StyledTableCell>
                            <StyledTableCell key={9} align="left">
                                {measurement['iterations']}
                            </StyledTableCell>
                            <StyledTableCell key={10} align="left">
                                {measurement['selectedIteration']}
                            </StyledTableCell>
                        </React.Fragment>
                    </StyledTableRow>))}
            </TableBody> : ''}
        </Table>
    </TableContainer>)
}

export default MeasurementTemplate;