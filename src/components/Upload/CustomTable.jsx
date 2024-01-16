import React, { useState, useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';

import {
  memoryTypes,
  memoryBrands,
  MRAMModels,
  FRAMModels
} from '../../data/navbar_config';

import { styled } from '@mui/material/styles';

function Row({ row, onRowChange }) {
  const {
    id,
    fileName,
    testType,
    title,
    board,
    memoryType,
    memoryBrand,
    memoryModel,
    memoryLabel,
    dataSetupTime,
    voltage,
    temperature,
    startAddress,
    stopAddress,
    iteration
  } = row;

  const [errors, setErrors] = useState({
    memoryType: '',
    memoryBrand: '',
    memoryModel: '',
    memoryLabel: ''
  });

  const [open, setOpen] = React.useState(false);

  const handleRowChange = (name, value, type) => {
    onRowChange(row.id, name, value, type);
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0
    }
  }));

  const renderOptions = (list) => {
    return list.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  /*  const handleMemoryLabelChange = (name) => (event) => {
    console.log(
      '🚀 ~ file: AddMemoryTest.jsx:83 ~ memoryLabel ~ event:',
      name,
      event.target.value
    );
    let value = event.target.value.replace(/\s/g, '').toUpperCase();
    setValues({ ...values, [name]: value });
    validate();
    console.log('🚀 ~ file: AddMemoryTest.jsx:83 ~ memoryLabel ~ event:', value);
  }; */

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <TextField
            id="outlined-basic"
            variant="standard"
            name="title"
            error={title === ''}
            value={title}
            onChange={(e) =>
              handleRowChange(e.target.name, e.target.value, e.target.type)
            }
          />
        </TableCell>
        <TableCell align="left">
          <TextField
            id="outlined-basic"
            variant="standard"
            name="testType"
            error={testType === ''}
            value={testType}
            onChange={(e) =>
              handleRowChange(e.target.name, e.target.value, e.target.type)
            }
          />
        </TableCell>
        <TableCell align="left">
          <TextField
            id="outlined-basic"
            variant="standard"
            name="board"
            error={board === ''}
            value={board}
            onChange={(e) =>
              handleRowChange(e.target.name, e.target.value, e.target.type)
            }
          />
        </TableCell>
        <TableCell align="right">
          <IconButton aria-label="delete" color="error">
            <ClearIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                style={{ color: 'blue' }}
              >
                {fileName}
              </Typography>

              {/**Memory section*/}
              <Box xs={{ margin: 1 }}>
                <Typography
                  className="mr-2 text-gray-900 font-semibold mb-1"
                  gutterBottom
                >
                  Memory Info
                </Typography>

                <div className="grid md:grid-cols-4 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      id="memorySelect"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      name="memoryType"
                      value={memoryType}
                      onChange={(e) =>
                        handleRowChange(
                          e.target.name,
                          e.target.value.replace(/\s/g, '').toUpperCase(),
                          e.target.type
                        )
                      }
                      label="Memory Type"
                    >
                      <option value="">Memory Type</option>

                      {renderOptions(memoryTypes)}
                    </select>
                    {memoryType === '' ? (
                      <p className="text-red-800 text-sm mt-1">
                        * Type is required
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      id="memoryBrandSelect"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      value={memoryBrand}
                      name="memoryBrand"
                      onChange={(e) =>
                        handleRowChange(
                          e.target.name,
                          e.target.value,
                          e.target.type
                        )
                      }
                      label="Brand"
                    >
                      <option value="">Brand</option>
                      {renderOptions(memoryBrands)}
                    </select>
                    {memoryBrand === '' ? (
                      <p className="text-red-800 text-sm mt-1">
                        * Brand is required
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-4 group">
                    <select
                      id="memory_model_select"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      value={memoryModel}
                      name="memoryModel"
                      onChange={(e) =>
                        handleRowChange(
                          e.target.name,
                          e.target.value,
                          e.target.type
                        )
                      }
                    >
                      <option selected value="">
                        Model
                      </option>
                      {memoryType === 'FRAM'
                        ? renderOptions(FRAMModels)
                        : renderOptions(MRAMModels)}
                    </select>
                    {memoryModel === '' ? (
                      <p className="text-red-800 text-sm mt-1">
                        * Model is required
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="relative z-0 w-full mb-4 group">
                    <input
                      label="Memory Label"
                      variant="standard"
                      type="text"
                      name="memoryLabel"
                      value={memoryLabel}
                      id="memoryLabel"
                      className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder="Memory Lable"
                      onChange={(e) =>
                        handleRowChange(
                          e.target.name,
                          e.target.value,
                          e.target.type
                        )
                      }
                      required
                    />
                    {memoryLabel === '' ? (
                      <p className="text-red-800 text-sm mt-1">
                        * Label is required
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </Box>

              {/**Second section*/}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Data Setup Time</TableCell>
                    <TableCell>Voltage</TableCell>
                    <TableCell>Temperature</TableCell>
                    <TableCell>Start Address</TableCell>
                    <TableCell>Stop Address</TableCell>
                    <TableCell>Iteration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="dataSetupTime"
                        type="number"
                        error={dataSetupTime === ''}
                        helperText="Required entry."
                        value={dataSetupTime}
                        onChange={(e) =>
                          handleRowChange(
                            e.target.name,
                            e.target.value,
                            e.target.type
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="voltage"
                        type="number"
                        size="small"
                        error={voltage === ''}
                        helperText="Required entry."
                        value={voltage}
                        onChange={(e) =>
                          handleRowChange(
                            e.target.name,
                            e.target.value,
                            e.target.type
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="temperature"
                        size="small"
                        type="number"
                        error={temperature === ''}
                        helperText="Required entry."
                        value={temperature}
                        onChange={(e) =>
                          handleRowChange(
                            e.target.name,
                            e.target.value,
                            e.target.type
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="startAddress"
                        size="small"
                        type="number"
                        error={startAddress === ''}
                        helperText="Required entry."
                        value={startAddress}
                        onChange={(e) =>
                          handleRowChange(
                            e.target.name,
                            e.target.value,
                            e.target.type
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="stopAddress"
                        size="small"
                        type="number"
                        error={stopAddress === ''}
                        helperText="Required entry."
                        value={stopAddress}
                        onChange={(e) =>
                          handleRowChange(
                            e.target.name,
                            e.target.value,
                            e.target.type
                          )
                        }
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        id="outlined-basic"
                        variant="outlined"
                        name="iteration"
                        type="number"
                        size="small"
                        error={iteration === ''}
                        helperText="Required entry."
                        value={iteration}
                        onChange={(e) =>
                          handleRowChange(
                            e.target.name,
                            e.target.value,
                            e.target.type
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function CustomTable(props) {
  const { jsonData, csvFiles, onSubmit } = props;

  const [measurmentsRows, setMeasurmentsRows] = useState(jsonData);
  const [modifiedRows, setModifiedRows] = useState([]);
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    console.log('isFormValid:', isFormValid);
    if (isValid) {
      setIsFormValid(true);
    }
  }, [isFormValid]);

  const handleRowChange = (id, name, value, type) => {
    console.log(name, value);

    setMeasurmentsRows((prevFormData) => {
      const updatedFormData = prevFormData.map((data) => {
        if (data.id === id) {
          return { ...data, [name]: value };
        }
        return data;
      });
      return updatedFormData;
    });
  };

  // Check if all fields are valid
  const isValid = measurmentsRows.every((data) => {
    return (
      data.fileName.trim() !== '' &&
      data.testType.trim() !== '' &&
      data.title.trim() !== '' &&
      data.board.trim() !== '' &&
      data.memoryLabel.trim() !== '' &&
      data.dataSetupTime !== '' &&
      data.voltage !== '' &&
      data.temperature !== '' &&
      data.startAddress !== '' &&
      data.stopAddress !== '' &&
      data.iteration !== ''
    );
  });

  const handleSubmitClick = (e) => {
    console.log('handleSubmit customTable');
    e.preventDefault();

    if (isValid) {
      onSubmit(measurmentsRows);
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
      console.log('Please fill in all fields with valid values.');
    }
  };

  const handleSaveClick = () => {
    // update only the modified rows
    const updatedRows = measurmentsRows.map((row) =>
      modifiedRows.includes(row.id) ? { ...row, isSaved: true } : row
    );
    setMeasurmentsRows(updatedRows);
    setModifiedRows([]);
  };

  const handleInputChange = (e, id) => {
    console.log(id);
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const updatedRows = measurmentsRows.map((row) => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setMeasurmentsRows(updatedRows);
    // add the modified row to the modifiedRows state if it's not already there
    if (!modifiedRows.includes(id)) {
      setModifiedRows([...modifiedRows, id]);
    }
  };

  const SubmitButton = styled(Button)(({ theme }) => ({
    fontSize: 16,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    padding: '6px 12px',
    margin: '15px 10px',
    '&:hover': {
      backgroundColor: '#0063cc',
      color: 'white'
    }
  }));

  const StyledRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: '#2c658b',
    borderRadius: '10px 10px',
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 1
    }
  }));

  const StyledCell = styled(TableCell)(({ theme }) => ({
    color: 'white'
  }));

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledRow>
              <TableCell />
              <StyledCell>Title</StyledCell>
              <StyledCell>Test Type</StyledCell>
              <StyledCell>Board</StyledCell>
              <StyledCell></StyledCell>
            </StyledRow>
          </TableHead>
          <TableBody>
            {measurmentsRows &&
              measurmentsRows.map((row) => (
                <Row key={row.id} row={row} onRowChange={handleRowChange} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SubmitButton
        variant="outlined"
        onClick={handleSubmitClick}
        endIcon={<SendIcon />}
      >
        Submit
      </SubmitButton>
      {!isFormValid ? (
        <Alert severity="error">
          This is an error alert- Please fill in all fields with valid values.
        </Alert>
      ) : null}
    </>
  );
}

export default CustomTable;
