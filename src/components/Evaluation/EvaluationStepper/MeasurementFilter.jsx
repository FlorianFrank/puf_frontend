import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';

import {Chip, TableContainer, Paper, Grid, Typography} from '@mui/material';

import { getTableCNTPUFs } from './CNTs/MeasurementFilterMethodsCNTs';
import { getTableMemories, getChipColor } from './Memories/MeasurementFilterMethodsMemories';


const MeasurementFilter = ({evalType}) => {
    const [groupedMeasurements, setGroupedMeasurements] = useState({});
    const [measurements, setMeasurements] = useState(
        JSON.parse(localStorage.getItem('selectedMeasurements')) || []
    );

    useEffect(() => {
        localStorage.setItem('selectedMeasurements', JSON.stringify(measurements));
    }, [measurements]);

    // Update grouped measurements whenever measurement groups change
    useEffect(() => {
        const grouped = groupBy(measurements, (group) =>
            JSON.stringify({
                testType: group.testType,
                memoryLabel: group.memoryLabel
            })
        );
        setGroupedMeasurements(grouped);
    }, [measurements]);

    const deleteObject = (id) => {
        const updatedGroups = measurements.filter((group) => group.id !== id);
        setMeasurements(updatedGroups);

        // Update the groupedMeasurements directly
        setGroupedMeasurements((prevGroups) =>
            Object.fromEntries(
                Object.entries(prevGroups).filter(([groupKey]) => {
                    const group = JSON.parse(groupKey);
                    return group.id !== id;
                })
            )
        );

        localStorage.setItem('selectedMeasurements', JSON.stringify(updatedGroups));
    };

    const selectTable = (evalType, groupMeasurements) => {
        if (evalType === 'cnt_puf') {
            return getTableCNTPUFs(groupMeasurements, (identifier) => deleteObject(identifier));
        } else if (evalType === 'memory') {
            return getTableMemories(groupMeasurements, (identifier) => deleteObject(identifier));
        }
    };

    return (
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                List of selected measurements
            </Typography>
            {Object.entries(groupedMeasurements).map(([groupKey, groupMeasurements]) => {
                const group = JSON.parse(groupKey);
                const { testType, memoryLabel } = group;

                return (
                    <div key={groupKey} style={{ marginBottom: 20 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            <Chip label={testType} style={getChipColor(testType)} />
                            <Chip label={memoryLabel} />
                        </div>
                        <TableContainer component={Paper} style={{ marginTop: 10, marginBottom: 50 }}>
                            {selectTable(evalType, groupMeasurements)}
                        </TableContainer>
                    </div>
                );
            })}
        </Grid>
    );
};
export default MeasurementFilter;
