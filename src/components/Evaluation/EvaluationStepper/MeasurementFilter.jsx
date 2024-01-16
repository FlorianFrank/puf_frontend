import React, { useState, useEffect } from 'react';
import { groupBy } from 'lodash';

import { IconButton } from '@mui/material';
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

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
    console.log(id);
    const updatedGroups = measurements.filter((group) => group.id !== id);

    setMeasurements(updatedGroups);

    // Update the groupedMeasurements in local storage
    const updatedGroupedMeasurements = Object.fromEntries(
      Object.entries(groupedMeasurements).filter(([groupKey]) => {
        const group = JSON.parse(groupKey);
        return group.id !== id;
      })
    );
    setGroupedMeasurements(updatedGroupedMeasurements);
    localStorage.setItem('selectedMeasurements', JSON.stringify(updatedGroups));
    console.log(localStorage.getItem('selectedMeasurements'));
  };

  const getChipColor = (testType) => {
    const readRelatedWords = ['read', 'latency'];
    const writeRelatedWords = ['write', 'latency'];
    const reliabiltyRelatedWords = ['write', 'latency'];
    const rowHammeringRelatedWords = ['row', 'hammering'];

    if (
      readRelatedWords.some((word) => testType.toLowerCase().includes(word))
    ) {
      return { color: 'white', backgroundColor: '#81d4fa' };
    } else if (
      writeRelatedWords.some((word) => testType.toLowerCase().includes(word))
    ) {
      return { color: 'white', backgroundColor: '#80cbc4' };
    } else if (
      reliabiltyRelatedWords.some((word) =>
        testType.toLowerCase().includes(word)
      )
    ) {
      return { color: 'white', backgroundColor: '#b2ebf2' };
    } else if (
      rowHammeringRelatedWords.some((word) =>
        testType.toLowerCase().includes(word)
      )
    ) {
      return { color: 'white', backgroundColor: '#64ffda' };
    }

    return { color: 'black', backgroundColor: 'gray' };
  };


  const table_memories = (groupMeasurements) => {
    return <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>DST</TableCell>

          <TableCell>Iteration</TableCell>
          <TableCell>Voltage</TableCell>
          <TableCell>Temperature</TableCell>
          <TableCell> Remove </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {groupMeasurements &&
            groupMeasurements.map((measurment, row) => (
                <>
                  <TableRow>
                    <TableCell>{measurment.id}</TableCell>
                    <TableCell>{measurment.dataSetupTime}</TableCell>
                    <TableCell>{measurment.iteration}</TableCell>
                    <TableCell>{measurment.voltage}</TableCell>
                    <TableCell>{measurment.temperature}</TableCell>
                    <TableCell>
                      <IconButton
                          onClick={() => deleteObject(measurment.id)}
                          color="error"
                          aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
            ))}
      </TableBody>
    </Table>
  }

  const table_cnt_pufs = (groupMeasurements) => {
    return <Table size="small">
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
            groupMeasurements.map((measurment, row) => (
                <>
                  <TableRow>
                    <TableCell>{measurment.id}</TableCell>
                    <TableCell>{measurment.testType}</TableCell>
                    <TableCell>{measurment.testName}</TableCell>
                    <TableCell>{measurment.wafer}</TableCell>
                    <TableCell>{measurment.rowOnWafer}</TableCell>
                    <TableCell>{measurment.columnOnWafer}</TableCell>
                    <TableCell>{measurment.pufID}</TableCell>
                    <TableCell>{measurment.rowOnPUF}</TableCell>
                    <TableCell>{measurment.columnOnPUF}</TableCell>
                    <TableCell>{measurment.temperature}</TableCell>
                    <TableCell>{measurment.iteration}</TableCell>
                    <TableCell>
                      <IconButton
                          onClick={() => deleteObject(measurment.id)}
                          color="error"
                          aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
            ))}
      </TableBody>
    </Table>
  }

  const select_table = (evalType, groupMeasurements) => {
    if (evalType === 'cnt_puf')
      return table_cnt_pufs(groupMeasurements)
    else if (evalType === 'memory')
      return table_memories(groupMeasurements)
  }

  return (
    <Grid item xs={12} md={6}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        List of selected measurments
      </Typography>
      {
        // Group the measurement groups by test type and memory label
        Object.entries(groupedMeasurements).map(
          ([groupKey, groupMeasurements]) => {
            const group = JSON.parse(groupKey);
            const { testType, memoryLabel } = group;

            console.log('🚀 ~ group.measurments:', groupMeasurements);

            return (
              <>
                <div key={groupKey} style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    <Chip label={testType} style={getChipColor(testType)} />
                    <Chip label={memoryLabel} />
                  </div>
                </div>
                <TableContainer
                  component={Paper}
                  style={{ marginTop: 10, marginBottom: 50 }}
                >
                  {select_table(evalType, groupMeasurements)}
                </TableContainer>
              </>
            );
          }
        )
      }
    </Grid>
  );
};

export default MeasurementFilter;
