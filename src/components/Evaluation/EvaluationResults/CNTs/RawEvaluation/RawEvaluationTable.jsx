import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {StyledCheckbox, StyledTableCell, StyledTableRow} from "../../../../Utils/StyledComponents";
import TableBody from "@mui/material/TableBody";
import React from "react";


const RawEvaluationTable = ({evaluationData, setExpanded, expanded}) => {
    return (<TableContainer component={Paper}>
        <Table sx={{width: '100%'}} aria-label="customized table">
            <TableHead>
                <StyledTableRow>
                    <StyledTableCell
                        align="left"
                    >
                        VDS
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Min
                    </StyledTableCell>
                    <StyledTableCell align="left" rowSpan={2}>
                        Max
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

                {(evaluationData) ? evaluationData.map((evalData) => (
                    <StyledTableRow>
                        <React.Fragment>
                            <StyledTableCell key={0} align="left">
                                {evalData['vds']}
                            </StyledTableCell>
                            <StyledTableCell key={1} align="left">
                                {evalData['min']}
                            </StyledTableCell>
                            <StyledTableCell key={1} align="left">
                                {evalData['max']}
                            </StyledTableCell>
                        </React.Fragment>
                    </StyledTableRow>)) : ''}
            </TableBody> : ''}
        </Table>
    </TableContainer>)
}

export default RawEvaluationTable;