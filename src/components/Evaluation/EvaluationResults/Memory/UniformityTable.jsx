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
import Box from '@mui/material/Box';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MemoryIcon from '@mui/icons-material/Memory';

import { Checkbox, Button } from '@mui/material';

import Heatmap from './Heatmap';
import { useStateContext } from '../../contexts/ContextProvider';
import { BACKEND_BASE_URL } from '../../config';
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

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: '40px',
  // Adding bottom shadow
  boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',

  // Adding a subtle border
  border: '1px solid rgba(0, 0, 0, 0.1)',

  // Adding a subtle gradient background
  background: 'linear-gradient(to bottom, #fff, #f5f5f5)'

  /*  '&:hover': {
    // Enhancing the shadow on hover to make it more interactive
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
  }, */
}));

function GroupRow({ group, evaluation_id, setExistingHeatmapIds }) {
  //const [heatmap, setHeatmap] = useState(null);
  console.log(group);
  const [heatmaps, setHeatmaps] = useState([]);
  const measurement_ids = group.challenge_measuremenst.map(
    (measurement) => measurement.id
  );
  console.log(measurement_ids);

  useEffect(() => {
    const fetchExistingHeatmapIds = async () => {
      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/brokerApi/existing-heatmap-ids/?evaluation_id=${evaluation_id}&measurement_ids=${JSON.stringify(
            measurement_ids
          )}`
        );
        const data = await response.json();
        console.log('data from existing heatmaps:::');
        console.log(data);
        // Append the fetched data to the existing heatmaps
        setHeatmaps(data);
        setExistingHeatmapIds(measurement_ids);
      } catch (error) {
        console.error('Error fetching existing heatmap IDs:', error);
      }
    };

    fetchExistingHeatmapIds();
  }, []);

  return (
    <Grid container spacing={2}>
      {heatmaps &&
        heatmaps.map((heatmap, index) => (
          <Grid key={heatmap.id} item xs={12} sm={6}>
            <Card variant="outlined" style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6">
                  Measurement ID: {heatmap.measurement_ids}
                </Typography>
                <img
                  src={`data:image/png;base64,${heatmap.heatmap_binary_image}`}
                  alt={`Heatmap ${heatmap.id}`}
                  style={{ width: '100%' }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
}

export default function UniformityTable(props) {
  const {
    memoryGroup,
    group,
    initialValueGroup,
    totalMeasurements,
    addressesGroup,
    evaluation_id
  } = props;

  const { heatmapSocket } = useStateContext();

  console.log('addressesGroup: ', addressesGroup);

  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState([]);
  const [heatmapVisible, setHeatmapVisible] = useState(false);
  const [existingHeatmapIds, setExistingHeatmapIds] = useState([]);
  const [open, setOpen] = useState(null);
  const [openGroups, setOpenGroups] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [disabledIds, setDisabledIds] = useState([]);

  useEffect(() => {
    async function fetchDisabledIds(measId) {
      const response = await fetch(
        `${BACKEND_BASE_URL}/brokerApi/check-heatmap-ids/?meas_id=${measId}`
      );
      const data = await response.json();
      if (data.exists) {
        console.log('exists', data.exists);
        setDisabledIds((prevIds) => [...prevIds, measId]);
      }
    }

    // Extracting all measurement ids from the provided object
    addressesGroup.challenges.forEach((challengeObj) => {
      challengeObj.challenge_measuremenst.forEach((meas) => {
        console.log('check ', meas.id);
        fetchDisabledIds(meas.id);
      });
    });
  }, []);

  useEffect(() => {
    console.log(heatmapSocket);

    heatmapSocket.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log(messageData);
      if (messageData.message === 'Heatmap generation complete') {
        setIsLoading(false);
      }
      // Handle other messages as needed
    };

    return () => {
      heatmapSocket.close();
    };
  }, []);

  //const isSelected = (id) => selected.indexOf(id) !== -1;
  const isSelected = (group) => {
    const groupIDs = group.challenge_measuremenst.map(
      (measurement) => measurement.id
    );

    // Find if the current group's IDs are already in one of the sub-arrays of `selected`
    const groupIndex = selected.findIndex(
      (subArray) =>
        subArray.length === groupIDs.length &&
        subArray.every((id) => groupIDs.includes(id))
    );

    return groupIndex !== -1;
  };

  const isMeasSelected = (measurementId) => {
    return selected.includes(measurementId);
  };

  const handleSelectAllClick = (event) => {
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
  };

  const handleSelectAllGroup = (event, group) => {
    console.log(group);
    const groupIDs = group.challenge_measuremenst.map(
      (measurement) => measurement.id
    );
    console.log(groupIDs);

    if (event.target.checked) {
      // Add the current group's IDs to the selected array of arrays if they are not already present
      setSelected((prevSelected) => {
        const isAlreadySelected = prevSelected.some(
          (subArray) =>
            subArray.length === groupIDs.length &&
            subArray.every((id) => groupIDs.includes(id))
        );

        if (!isAlreadySelected) {
          return [...prevSelected, groupIDs];
        } else {
          return prevSelected;
        }
      });
    } else {
      // Remove the current group's IDs from the selected array of arrays if they are present
      setSelected((prevSelected) => {
        const newSelected = prevSelected.filter(
          (subArray) =>
            !(
              subArray.length === groupIDs.length &&
              subArray.every((id) => groupIDs.includes(id))
            )
        );
        return newSelected;
      });
    }
  };

  const handleCheckboxClick = (event, id) => {
    console.log(id);
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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

  const handleGenerateHeatmap = async (addressesGroup) => {
    console.log('handleGenerateHeatmap');
    console.log(selected);
    console.log(addressesGroup);

    const groupedFilteredData = selected.map((selectedId) => {
      return addressesGroup.challenges.flatMap((challenge) =>
        challenge.challenge_measuremenst.filter(
          (measurement) => measurement.id === selectedId
        )
      );
    });

    console.log(groupedFilteredData);

    /*  const groupedFilteredData = selected.map((selectedGroup) => {
      return selectedGroup.flatMap((selectedId) => {
        return addressesGroup.challenges.flatMap((challenge) =>
          challenge.challenge_measuremenst.filter(
            (measurement) => measurement.id === selectedId
          )
        );
      });
    }); */

    const requestData = {
      data: groupedFilteredData,
      evaluation_id: evaluation_id
    };
    console.log('groupedFilteredData');
    console.log(groupedFilteredData);
    //generate-heatmaps/
    const response = await fetch(
      `${BACKEND_BASE_URL}/brokerApi/generate-heatmaps/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }
    );
    const data = await response.json();

    console.log(data);
    // After generating the heatmaps, check if the meas.id values exist in the Heatmap table
    checkHeatmapExistence(selected);
  };

  const checkHeatmapExistence = async (selectedIds) => {
    console.log(selectedIds);
    for (let measId of selectedIds) {
      const response = await fetch(
        `${BACKEND_BASE_URL}/brokerApi/check-heatmap-ids/?meas_id=${measId}`
      );
      const data = await response.json();
      if (data.exists) {
        setDisabledIds((prevIds) => {
          console.log('data.exists');
          console.log(data.exists);
          if (!prevIds.includes(measId)) {
            return [...prevIds, measId];
          }
          return prevIds;
        });
      }
    }
  };

  const handleOpen = (uniqueGroupId) => {
    if (openGroups.includes(uniqueGroupId)) {
      setOpenGroups((prev) => prev.filter((id) => id !== uniqueGroupId));
    } else {
      setOpenGroups((prev) => [...prev, uniqueGroupId]);
    }
  };

  return (
    <StyledCard sx={{ width: '100%' }}>
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
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
          Fractional Hamming Weight of Experimental Results
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
            <Table sx={{ width: '100%' }} aria-label="customized table">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell rowSpan={2}>
                    <Avatar
                      alt="Icon"
                      src="/home/elkhay01/Desktop/Thesis/code/puf_frontend/public/icons8-heat-map-32.png"
                    />
                  </StyledTableCell>
                  {/* <StyledTableCell align="center" rowSpan={2}>
                    <StyledCheckbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < totalMeasurements
                      }
                      checked={
                        totalMeasurements > 0 &&
                        selected.length === totalMeasurements
                      }
                      onChange={handleSelectAllClick}
                    />{' '}
                  </StyledTableCell> */}
                  <StyledTableCell
                    align="center"
                    colSpan={addressesGroup.challengeKeys.length}
                  >
                    Challenges
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    ID
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Voltage
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Chip
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Iteration
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Zeros
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Ones
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Gaps
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Hamming Weight
                  </StyledTableCell>
                  <StyledTableCell align="center" rowSpan={2}>
                    <StyledCheckbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < totalMeasurements
                      }
                      checked={
                        totalMeasurements > 0 &&
                        selected.length === totalMeasurements
                      }
                      onChange={handleSelectAllClick}
                    />{' '}
                  </StyledTableCell>
                </StyledTableRow>

                <StyledTableRow>
                  {addressesGroup.challengeKeys.map((challenge, i) => (
                    <StyledTableCell key={i} align="center">
                      {challenge}
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              </TableHead>

              <TableBody>
                {addressesGroup.challenges.map((challengeGroup, groupIndex) => {
                  //console.log(challengeGroup);
                  const uniqueGroupId = groupIndex; // Assuming challengeGroup has an 'id' property. If not, use groupIndex.
                  //console.log(uniqueGroupId)

                  return (
                    <>
                      {challengeGroup.challenge_measuremenst.map((meas, i) => (
                        <>
                          <TableRow key={i}>
                            {i === 0 &&
                              challengeGroup.challenge.map((c, j) => (
                                <>
                                  <StyledTableCell
                                    rowSpan={
                                      challengeGroup.challenge_measuremenst
                                        .length
                                    }
                                  >
                                    <IconButton
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => handleOpen(uniqueGroupId)}
                                    >
                                      {openGroups.includes(uniqueGroupId) ? (
                                        <KeyboardArrowUpIcon />
                                      ) : (
                                        <KeyboardArrowDownIcon />
                                      )}
                                    </IconButton>
                                  </StyledTableCell>

                                  {/*  <StyledTableCell
                                    align="center"
                                    rowSpan={
                                      challengeGroup.challenge_measuremenst
                                        .length
                                    }
                                    padding="checkbox"
                                  >
                                    <Checkbox
                                      checked={isSelected(challengeGroup)}
                                      onChange={(event) =>
                                        handleSelectAllGroup(
                                          event,
                                          challengeGroup
                                        )
                                      }
                                    />
                                  </StyledTableCell> */}

                                  <TableCell
                                    align="center"
                                    rowSpan={
                                      challengeGroup.challenge_measuremenst
                                        .length
                                    }
                                  >
                                    {c.challengeValue}
                                  </TableCell>
                                </>
                              ))}{' '}
                            {/* DISPLAY chalenge values */}
                            <StyledTableCell align="left">
                              {meas.id}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {meas.voltage}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {meas.memoryLabel}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {meas.iteration}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {meas.zeros}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {meas.ones}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {meas.gaps}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {`${ccyFormat(meas.hammingWeight)}`}
                            </StyledTableCell>
                            <StyledTableCell align="center" padding="checkbox">
                              <Checkbox
                                checked={isMeasSelected(meas.id)}
                                onChange={(event) =>
                                  handleCheckboxClick(event, meas.id)
                                }
                                disabled={disabledIds.includes(meas.id)}
                              />
                            </StyledTableCell>
                          </TableRow>
                        </>
                      ))}
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={11}
                        >
                          {/* <Heatmap
                              group={challengeGroup}
                              evaluation_id={evaluation_id}
                              setExistingHeatmapIds={setExistingHeatmapIds}
                            /> */}
                          <Collapse
                            in={openGroups.includes(uniqueGroupId)}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ margin: 1 }}>
                              <Typography
                                className="mr-2 text-gray-900 font-semibold mb-1"
                                gutterBottom
                              >
                                Heatmaps
                              </Typography>
                            </Box>
                            <GroupRow
                              group={challengeGroup}
                              evaluation_id={evaluation_id}
                              setExistingHeatmapIds={setExistingHeatmapIds}
                            />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleGenerateHeatmap(addressesGroup)}
        >
          Generate Heatmap
        </Button>
      </Collapse>
    </StyledCard>
  );
}

/*
challenge
*/
