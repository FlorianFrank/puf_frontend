import React from "react";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function getTableMemories(groupMeasurements, deleteObject) {
    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Data Setup Time</TableCell>
                    <TableCell>Iteration</TableCell>
                    <TableCell>Voltage</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Remove</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {groupMeasurements &&
                    groupMeasurements.map((measurement) => (
                        <TableRow key={measurement.id}>
                            <TableCell>{measurement.id}</TableCell>
                            <TableCell>{measurement.dataSetupTime}</TableCell>
                            <TableCell>{measurement.iteration}</TableCell>
                            <TableCell>{measurement.voltage}</TableCell>
                            <TableCell>{measurement.temperature}</TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => deleteObject(measurement.id)}
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

export const getChipColor = (testType) => {
    const readRelatedWords = ['read', 'latency'];
    const writeRelatedWords = ['write', 'latency'];
    const reliabilityRelatedWords = ['reliability'];
    const rowHammeringRelatedWords = ['row', 'hammering'];

    if (readRelatedWords.some((word) => testType.toLowerCase().includes(word))) {
        return {color: 'white', backgroundColor: '#81d4fa'};
    } else if (writeRelatedWords.some((word) => testType.toLowerCase().includes(word))) {
        return {color: 'white', backgroundColor: '#80cbc4'};
    } else if (reliabilityRelatedWords.some((word) => testType.toLowerCase().includes(word))) {
        return {color: 'white', backgroundColor: '#b2ebf2'};
    } else if (rowHammeringRelatedWords.some((word) => testType.toLowerCase().includes(word))) {
        return {color: 'white', backgroundColor: '#64ffda'};
    }

    return {color: 'black', backgroundColor: 'gray'};
};

export class table_memories {
}