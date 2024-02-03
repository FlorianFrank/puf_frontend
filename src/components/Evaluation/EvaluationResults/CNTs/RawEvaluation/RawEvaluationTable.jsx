import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {StyledCheckbox, StyledTableCell, StyledTableRow} from "../../../../Utils/StyledComponents";
import TableBody from "@mui/material/TableBody";
import React from "react";


const RawEvaluationTable = ({evaluationData, setExpanded, expanded}) => {

    const renderTableCell = (element, id) => (
        <StyledTableCell key={id} align="left">
            {element}
        </StyledTableCell>);

    return (<TableContainer component={Paper}>
        <Table sx={{width: '100%'}} aria-label="customized table">
            <TableHead>
                <StyledTableRow>
                    {['VDS', 'Min', 'Max'].map((header, index) =>
                        renderTableCell(header, index)
                    )}
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

                {(evaluationData) ? evaluationData.map((evalData) => (
                    <StyledTableRow>
                        <React.Fragment>
                            {['vds', 'min', 'max'].map((key, index) =>
                                renderTableCell(evalData[key], index)
                            )}
                        </React.Fragment>
                    </StyledTableRow>)) : ''}
            </TableBody> : ''}
        </Table>
    </TableContainer>)
}

export default RawEvaluationTable;