import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import React from "react";
import TableContainer from "@mui/material/TableContainer";
import {StyledTableRow, StyledTableCell, StyledCheckbox} from "../../../../Utils/StyledComponents";

const MeasurementTemplate = ({connectedMeasurements, setExpanded, expanded}) => {


    const renderTableCell = (element, id) => (
        <StyledTableCell key={id} align="left">
            {element}
        </StyledTableCell>);

    return (<TableContainer component={Paper}>
        <Table sx={{width: '100%'}} aria-label="customized table">
            <TableHead>
                <StyledTableRow>
                    {['ID', 'Test Type', 'Test Name', 'Wafer', 'Row', 'Column', 'PUF ID', 'Row on PUF', 'Column on PUF', 'Temperature', 'Iterations', 'Selected Iteration']
                        .map((header, index) => renderTableCell(header, index))}
                    <StyledTableCell align="center" rowSpan={2}>
                        <StyledCheckbox
                            indeterminate={true}
                            checked={true}
                            onChange={() => {
                                setExpanded(!expanded);
                            }}
                        />{' '}
                    </StyledTableCell>
                </StyledTableRow>
            </TableHead>
            {expanded && (<TableBody>
                {connectedMeasurements.map((measurement) => (<StyledTableRow>
                    <React.Fragment>
                        {['id', 'testType', 'testTitle', 'wafer', 'row', 'column', 'pufID', 'rowOnPUF', 'columnOnPUF', 'temperature', 'iterations', 'selectedIteration'].map((key, index) => {
                            return renderTableCell(measurement[key], index)
                        })}
                    </React.Fragment>
                </StyledTableRow>))}
            </TableBody>)}
        </Table>
    </TableContainer>)
}

export default MeasurementTemplate;