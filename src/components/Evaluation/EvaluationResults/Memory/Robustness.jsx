import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import MemoryIcon from '@mui/icons-material/Memory';
import { Checkbox, Button } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { v5 as uuidv5 } from 'uuid';
import {BACKEND_BASE_URL} from "../../../../config";
const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'; // Example namespace UUID

function ccyFormat(num) {
  return `${num.toFixed(4)}`;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: 'white' // For example, set the default color to pink
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const Robustness = (props) => {
  const { data, evaluation_id } = props;
  console.log('🚀 ~ file: Robustness.jsx:59 ~ Robustness ~ data:', data);

  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState([]);
  const [disabledIds, setDisabledIds] = useState([]);

  async function fetchDisabledIds(measGroupKey) {
    const response = await fetch(
      `${BACKEND_BASE_URL}/brokerApi/check-heatmap-ids/?meas_id=${measGroupKey}`
    );
    const data = await response.json();
    if (data.exists) {
      console.log('exists', data.exists);
      setDisabledIds((prevIds) => [...prevIds, measGroupKey]);
    }
  }

  useEffect(() => {
    // Extracting all measurement ids from the provided object
    data.flatMap((group) =>
      group.memories.flatMap((memoryGroup) =>
        memoryGroup.initialValueKey.flatMap((initialValueGroup) =>
          initialValueGroup.startStopAddresses.flatMap((addressesGroup) =>
            addressesGroup.chipInstances.flatMap((chipGroup) =>
              chipGroup.challenges.flatMap((challengeGroup) =>
                challengeGroup.challenge_measuremenst.filter((meas) => {
                  const concatenatedIds = meas.id_filename_list
                    .map((item) => item.id)
                    .join('');
                  const groupKeyForMeas = uuidv5(concatenatedIds, NAMESPACE);
                  console.log(groupKeyForMeas);
                  fetchDisabledIds(groupKeyForMeas);
                })
              )
            )
          )
        )
      )
    );
  }, []);

  const handleGenerateHeatmap = async () => {
    // Extract the selected rows based on the selected IDs
    const selectedRows = [];
    data.flatMap((group) =>
      group.memories.flatMap((memoryGroup) =>
        memoryGroup.initialValueKey.flatMap((initialValueGroup) =>
          initialValueGroup.startStopAddresses.flatMap((addressesGroup) =>
            addressesGroup.chipInstances.flatMap((chipGroup) =>
              chipGroup.challenges.flatMap((challengeGroup) =>
                challengeGroup.challenge_measuremenst.filter((meas) => {
                  const concatenatedIds = meas.id_filename_list
                    .map((item) => item.id)
                    .join('');
                  const groupKeyForMeas = uuidv5(concatenatedIds, NAMESPACE);
                  console.log(groupKeyForMeas);
                  if (selected.includes(groupKeyForMeas)) {
                    selectedRows.push({
                      [groupKeyForMeas]: {
                        id_filename_list: meas.id_filename_list,
                        initialValue: initialValueGroup.initialValue,
                        startAddress: addressesGroup.startAddress,
                        stopAddress: addressesGroup.stopAddress,
                        evaluationId: evaluation_id
                      }
                    });
                  }

                  //selected.includes(groupKeyForMeas) ? { [groupKeyForMeas]: meas.id_filename_list } : null;
                })
              )
            )
          )
        )
      )
    );
    console.log('selectedRows', selectedRows);

    // Send the selectedRows to the backend
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/brokerApi/generate-rebustness-heatmaps/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(selectedRows)
        }
      );
      const data = await response.json();
      console.log(data);
      // Handle the response as needed
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isMeasSelected = (meas_list) => {
    // Concatenate all the ids
    const concatenatedIds = meas_list.map((item) => item.id).join('');

    // Generate a unique UUID based on the concatenated string
    const groupKey = uuidv5(concatenatedIds, NAMESPACE);
    return selected.includes(groupKey);
  };

  const handleCheckboxClick = (event, meas_list) => {
    console.log(meas_list);
    // Concatenate all the ids
    const concatenatedIds = meas_list.map((item) => item.id).join('');

    // Generate a unique UUID based on the concatenated string
    const groupKey = uuidv5(concatenatedIds, NAMESPACE);

    const selectedIndex = selected.indexOf(groupKey);
    let newSelected = [];
    console.log(selectedIndex);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, groupKey);
      console.log(newSelected);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const fetchHeatmapBlob = async (meas_list) => {
    try {
      console.log(meas_list);
      const concatenatedIds = meas_list.map((item) => item.id).join('');
      // Generate a unique UUID based on the concatenated string
      const groupKey = uuidv5(concatenatedIds, NAMESPACE);
      const response = await fetch(
        `${BACKEND_BASE_URL}/brokerApi/robustness-heatmap/?evaluation_id=${evaluation_id}&measurement_key=${groupKey}`
      );
      const data = await response.json();
      console.log('data from existing heatmaps:::');
      console.log(data);
      // Append the fetched data to the existing heatmaps
      //setHeatmapData(data);
      // Open the heatmap in a new window
      const heatmapData = data[0]; // Adjust this based on your data structure
      openHeatmapWindow(heatmapData);
    } catch (error) {
      console.error('Error fetching existing heatmap IDs:', error);
    }
  };

  /*  const handleSelectAllClick = (event, addressesGroup) => {
    console.log(addressesGroup)
    if (event.target.checked) {
      const newSelecteds = addressesGroup.challenges.flatMap((challengeGroup) =>
        challengeGroup.challenge_measuremenst.map(
          (measurement) => measurement.id
        )
      );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }; */

  const openHeatmapWindow = (heatmapData) => {
    console.log('in open heatmap window');
    console.log(heatmapData);
    const base64Image = `data:image/png;base64,${heatmapData.heatmap_binary_image}`;

    // Open a new window
    let win = window.open('', '_blank', 'width=700,height=600');

    // Write the content to the new window
    win.document.write('<html><head><title>Heatmap</title></head><body>');
    win.document.write('<h2> Visualization of Bit Stability Patterns </h2>'); // Display the title
    win.document.write(
      '<img src="' +
        base64Image +
        '" alt="Heatmap" style="display:block; margin:auto; max-width:100%;"/>'
    );
    win.document.write(
      '<a href="' +
        base64Image +
        '" download="heatmap.png" style="display:block; text-align:center; margin-top:20px; padding: 10px 15px; background-color: #3f51b5; color: white; text-decoration: none; border-radius: 4px;">Download Heatmap</a>'
    );
    win.document.write('</body></html>');
  };

  return (
    <>
      {data.map((group) =>
        group.memories.map((memoryGroup) =>
          memoryGroup.initialValueKey.map((initialValueGroup) =>
            initialValueGroup.startStopAddresses.map(
              (addressesGroup, addressesGroupIndex) => {
                console.log(addressesGroup);
                return (
                  <Card sx={{ width: '100%' }} key={addressesGroupIndex}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="chip">
                          <MemoryIcon />
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={group.testType}
                      subheader={memoryGroup.memoryKey}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Memory Area : {addressesGroup.startAddress} -{' '}
                        {addressesGroup.stopAddress}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Initial Value: {initialValueGroup.initialValue}
                      </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                      <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                      >
                        Intra-HD of Experimental Results
                      </Typography>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ width: '100%' }}
                            aria-label="customized table"
                          >
                            <TableHead>
                              <StyledTableRow>
                                <StyledTableCell align="center" rowSpan={2}>
                                  Chip
                                </StyledTableCell>
                                <StyledTableCell
                                  align="center"
                                  colSpan={addressesGroup.challengeKeys.length}
                                >
                                  Challenges
                                </StyledTableCell>
                                <StyledTableCell align="left" rowSpan={2}>
                                  Min
                                </StyledTableCell>
                                <StyledTableCell align="left" rowSpan={2}>
                                  Avg
                                </StyledTableCell>
                                <StyledTableCell align="left" rowSpan={2}>
                                  Max
                                </StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>
                                  <StyledCheckbox
                                    indeterminate={selected.length > 0}

                                    /*  onChange={handleSelectAllClick(addressesGroup)} */
                                  />{' '}
                                </StyledTableCell>
                                <StyledTableCell align="center" rowSpan={2}>
                                  Heatmap
                                </StyledTableCell>
                              </StyledTableRow>
                              <StyledTableRow>
                                {addressesGroup.challengeKeys.map((c, i) => (
                                  <StyledTableCell key={i} align="center">
                                    {c}
                                  </StyledTableCell>
                                ))}
                              </StyledTableRow>
                            </TableHead>

                            <TableBody>
                              {addressesGroup.chipInstances.map(
                                (chipGroup, index) =>
                                  chipGroup.challenges.map(
                                    (challengeGroup, chalengeIndex) =>
                                      challengeGroup.challenge_measuremenst.map(
                                        (meas, j) => {
                                          return (
                                            <TableRow key={j}>
                                              {chalengeIndex === 0 && (
                                                <TableCell
                                                  align="center"
                                                  rowSpan={
                                                    chipGroup.challenges.length
                                                  }
                                                >
                                                  {chipGroup.chipLabel}
                                                </TableCell>
                                              )}{' '}
                                              {/* DISPLAY CHIP LAEL */}
                                              {challengeGroup.challenge.map(
                                                (c, i) => {
                                                  console.log(c);
                                                  return (
                                                    <StyledTableCell
                                                      align="center"
                                                      key={i}
                                                      rowSpan={
                                                        challengeGroup
                                                          .challenge_measuremenst
                                                          .length
                                                      }
                                                    >
                                                      {c.challengeValue}
                                                    </StyledTableCell>
                                                  );
                                                }
                                              )}
                                              {meas.Robustness ? (
                                                <>
                                                  <StyledTableCell align="left">
                                                    {ccyFormat(
                                                      meas.hammingDistance.min
                                                    )}{' '}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="left">
                                                    {ccyFormat(
                                                      meas.hammingDistance.avg
                                                    )}
                                                  </StyledTableCell>
                                                  <StyledTableCell align="left">
                                                    {ccyFormat(
                                                      meas.hammingDistance.max
                                                    )}
                                                  </StyledTableCell>
                                                  <StyledTableCell
                                                    align="center"
                                                    padding="checkbox"
                                                  >
                                                    <Checkbox
                                                      checked={isMeasSelected(
                                                        meas.id_filename_list
                                                      )}
                                                      onChange={(event) =>
                                                        handleCheckboxClick(
                                                          event,
                                                          meas.id_filename_list
                                                        )
                                                      }
                                                      disabled={disabledIds.includes(
                                                        uuidv5(
                                                          meas.id_filename_list
                                                            .map(
                                                              (item) => item.id
                                                            )
                                                            .join(''),
                                                          NAMESPACE
                                                        )
                                                      )}
                                                    />
                                                  </StyledTableCell>
                                                  <StyledTableCell align="center">
                                                    <IconButton
                                                      /*             disabled={!meas.heatmapGenerated}  // Assuming heatmapGenerated is a boolean in your data indicating if the heatmap is generated
                                                       */ onClick={() =>
                                                        fetchHeatmapBlob(
                                                          meas.id_filename_list
                                                        )
                                                      } // Assuming heatmapId is the ID for the heatmap
                                                    >
                                                      <RemoveRedEyeIcon
                                                        style={{
                                                          color: 'green'
                                                        }}
                                                      />{' '}
                                                    </IconButton>
                                                  </StyledTableCell>
                                                </>
                                              ) : (
                                                <StyledTableCell
                                                  colSpan={3}
                                                  align="left"
                                                >
                                                  <Alert severity="warning">
                                                    You need at least two
                                                    measurments!
                                                  </Alert>
                                                </StyledTableCell>
                                              )}
                                            </TableRow>
                                          );
                                        }
                                      )
                                  )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Collapse>
                    <br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleGenerateHeatmap}
                    >
                      Generate Heatmap
                    </Button>
                    <br />
                  </Card>
                );
              }
            )
          )
        )
      )}
    </>
  );
};

export default Robustness;
