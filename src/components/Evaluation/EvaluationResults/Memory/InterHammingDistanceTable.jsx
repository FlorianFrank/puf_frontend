import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import UniquenessHistogram from './UniquenessHistogam';
function ccyFormat(num) {
  return `${num.toFixed(4)}`;
}

const InterHammingDistanceTable = (props) => {
  const { group } = props;
  console.log(
    '🚀 ~ file: InterHammingDistanceTable.jsx:17 ~ InterHammingDistanceTable ~ group:',
    group
  );

  return (
    <>
      <br />

      <Typography
        sx={{ flex: '1 1 90%' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Inter Hamming Distance between diffrent chips
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ width: '50%' }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Chips
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Iterations
              </TableCell>
              <TableCell align="right">Hamming Distance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {group.inter_hamming_distances.length === 0 ? (
              <p>error</p>
            ) : (
              group.inter_hamming_distances.map((row) => (
                <TableRow key={`${row.chip1}-${row.chip2}`}>
                  <TableCell>{row.chip1}</TableCell>
                  <TableCell align="right">{row.chip2}</TableCell>
                  <TableCell align="right">{row.iterationChip1}</TableCell>
                  <TableCell align="center">{row.iterationChip2}</TableCell>
                  <TableCell align="right">{`${ccyFormat(
                    row.hammingDistance
                  )}`}</TableCell>
                </TableRow>
              ))
            )}

            <TableRow>
              <TableCell colSpan={3} rowSpan={4}></TableCell>
            </TableRow>
            {group.inter_hamming_distances.length === 0 ? (
              <p>error</p>
            ) : (
              <>
                <TableRow>
                  <TableCell>Min</TableCell>
                  <TableCell align="right">{`${ccyFormat(
                    group.min_inter_hamming_distances
                  )}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Max</TableCell>
                  <TableCell align="right">{`${ccyFormat(
                    group.max_inter_hamming_distances
                  )} `}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Avg</TableCell>
                  <TableCell align="right">{`${ccyFormat(
                    group.avg_inter_hamming_distances
                  )} `}</TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <UniquenessHistogram group={group}/>  */}
    </>
  );
};

export default InterHammingDistanceTable;
