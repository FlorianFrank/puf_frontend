import React from "react";
import PropTypes from "prop-types";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {StyledCheckbox, StyledTableCell, StyledTableRow} from "../../../../Utils/StyledComponents";

const Row = ({evalData}) => (
    <StyledTableRow>
        <StyledTableCell align="left">{evalData['wafer']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['row']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['column']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['pufID']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['nrSelectedCells']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['nrConductiveCells']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['nrNonConductiveCells']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['nrSemiConductiveCells']}</StyledTableCell>
        <StyledTableCell align="left">{evalData['hammingWeight']}</StyledTableCell>
    </StyledTableRow>
);

Row.propTypes = {
    evalData: PropTypes.object.isRequired,
};

const WaferEvaluationTable = ({evaluationData, setExpanded, expanded}) => (
    <TableContainer component={Paper}>
        <Table sx={{width: '100%'}} aria-label="customized table">
            <TableHead>
                <StyledTableRow>
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
                        Nr. Selected Cells
                    </StyledTableCell>

                    <StyledTableCell align="left" rowSpan={2}>
                        Nr. Conductive
                    </StyledTableCell>

                    <StyledTableCell align="left" rowSpan={2}>
                        Nr. Non-Conductive
                    </StyledTableCell>

                    <StyledTableCell align="left" rowSpan={2}>
                        Nr. Semi-Conductive
                    </StyledTableCell>

                    <StyledTableCell align="left" rowSpan={2}>
                        Hamming Weight
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
            {expanded && (
                <TableBody>
                    {evaluationData.map((evalData, index) => (
                        <Row key={index} evalData={evalData}/>
                    ))}
                </TableBody>
            )}
        </Table>
    </TableContainer>
);

WaferEvaluationTable.propTypes = {
    evaluationData: PropTypes.array.isRequired,
    setExpanded: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
};

export default WaferEvaluationTable;
