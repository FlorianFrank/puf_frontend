import React from "react";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function getTableCNTPUFs(groupMeasurements, deleteObject) {

    const handleDeleteObject = (id) => {
        deleteObject(id);
    };

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Test Type</TableCell>
                    <TableCell>Test Name</TableCell>
                    <TableCell>Wafer</TableCell>
                    <TableCell>Row</TableCell>
                    <TableCell>Column</TableCell>
                    <TableCell>PUF ID</TableCell>
                    <TableCell>Row on PUF</TableCell>
                    <TableCell>Column on PUF</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Iterations</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {groupMeasurements &&
                    groupMeasurements.map((measurement) => (
                        <TableRow key={measurement.id}>
                            <TableCell>{measurement.id}</TableCell>
                            <TableCell>{measurement.testType}</TableCell>
                            <TableCell>{measurement.testName}</TableCell>
                            <TableCell>{measurement.wafer}</TableCell>
                            <TableCell>{measurement.rowOnWafer}</TableCell>
                            <TableCell>{measurement.columnOnWafer}</TableCell>
                            <TableCell>{measurement.pufID}</TableCell>
                            <TableCell>{measurement.rowOnPUF}</TableCell>
                            <TableCell>{measurement.columnOnPUF}</TableCell>
                            <TableCell>{measurement.temperature}</TableCell>
                            <TableCell>{measurement.iteration}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => handleDeleteObject(measurement.id)}
                                    color="error"
                                    aria-label="delete"
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
