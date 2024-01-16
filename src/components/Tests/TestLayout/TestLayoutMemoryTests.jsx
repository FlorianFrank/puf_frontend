import React, {useState, useRef} from 'react';

import {useNavigate} from 'react-router-dom';
import {Collapse} from '@mui/material';

import {AiTwotoneDelete} from 'react-icons/ai';
import {CiEdit} from 'react-icons/ci';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import {styled} from '@mui/material/styles';
import {useStateContext} from '../../../contexts/ContextProvider';
import {BACKEND_IP_ADDRESS} from '../../../config'

import {
    memoryTypes,
    memoryBrands,
    MRAMModels,
    FRAMModels
} from '../../../data/navbar_config';

function Row(props) {
    const {row} = props;
    const {connectedDevices} = useStateContext();
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);
    //const [connectedDevices, setConnectedDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    const [values, setValues] = useState({
        memoryType: '',
        memoryBrand: '',
        memoryModel: '',
        memoryLabel: ''
    });

    const [errors, setErrors] = useState({
        memoryType: '',
        memoryBrand: '',
        memoryModel: '',
        memoryLabel: ''
    });

    const navigate = useNavigate();

    const deleteTest = (row) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(row)
        };

        const fetchStr = 'http://' + BACKEND_IP_ADDRESS + ':8000/testsApi/tests/' + row.id

        fetch(fetchStr,
            requestOptions
        ).then((data) => {
            console.log(data); // JSON data parsed by `data.json()` call
            navigate('/tests', {replace: true});
        }).catch((error) => {
            alert(error)
        });
    };

    const editTest = (id) => {
        console.log('Edit Test', id);
    };

    const startTest = async (id) => {
        console.log('🚀 ~ file: TestLayoutMemoryTests.jsx:58 ~ startTest ~ id:', id);

        const selectedDevice = connectedDevices.find(
            (device) => device.id.toString() === selectedDeviceId.toString()
        );

        // Combine the data from row, selectedDevice, and values
        const combinedData = {
            testData: row,
            deviceData: selectedDevice,
            memoryData: values
        };
        console.log(combinedData);

        const fetchStr = 'http://' + BACKEND_IP_ADDRESS + ':8088/startTest'
        try {
            const res = await fetch(fetchStr, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(combinedData)
            });
            const json = await res.json();
            setResponse(json);
            console.log(response);
            //navigate('/tests/waiting');
        } catch (err) {
            alert(fetchStr)
        }
    };

    const validate = () => {
        let newErrors = {};

        newErrors.memoryType = values.memoryType ? '' : 'This field is required.';
        newErrors.memoryBrand = values.memoryBrand ? '' : 'This field is required.';
        newErrors.memoryModel = values.memoryModel ? '' : 'This field is required.';
        newErrors.memoryLabel = values.memoryLabel ? '' : 'This field is required.';

        setErrors(newErrors);
        //return Object.keys(newErrors).length === 0;

        return Object.values(newErrors).every((x) => x === '');
    };

    const handleMemoryLabelChange = (name) => (event) => {
        console.log(
            '🚀 ~ file: AddMemoryTest.jsx:83 ~ memoryLabel ~ event:',
            name,
            event.target.value
        );
        let value = event.target.value.replace(/\s/g, '').toUpperCase();
        setValues({...values, [name]: value});
        validate();
        console.log('🚀 ~ file: AddMemoryTest.jsx:83 ~ memoryLabel ~ event:', value);
    };

    const renderOptions = (list) => {
        return list.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ));
    };

    const handleChange = (name) => (event) => {
        console.log(
            '🚀 ~ file: AddMemoryTest.jsx:83 ~ handleChange ~ event:',
            name,
            event.target.value
        );
        validate();

        if (name === 'dataSetupTime') {
            let dst = event.target.value;

            const regex = /^\d+[,-]\d+([,-]\d*)*$/;
            console.log(dst);
            console.log(regex.test(dst));

            setValues({...values, [name]: dst});
        } else {
            setValues({...values, [name]: event.target.value});
        }
    };

    const handleOptionChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    console.log(errors.memoryLabel);

    return (
        <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="left">{row.testType}</TableCell>
                <TableCell
                    align="left"
                    className="inline-grid grid-cols-2 gap-4 px-1 py-4"
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            //e.stopPropagation()
                            editTest(row.id);
                        }}
                        className="bg-blue-200/30 p-1 rounded-full w-8 h-8 flex items-center justify-center text-blue-600 opacity-75 hover:opacity-100 outline-none"
                    >
                        <CiEdit/>
                    </button>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTest(row);
                        }}
                        className="bg-red-200/30 p-1 rounded-full w-8 h-8 flex items-center justify-center text-red-600 opacity-75 hover:opacity-100 outline-none"
                    >
                        <AiTwotoneDelete/>
                    </button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={4}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography
                                className="mr-2 text-gray-900 font-semibold mb-1"
                                gutterBottom
                            >
                                Characteristics
                            </Typography>
                            <Table size="small" aria-label="moreInfo">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Start Address</TableCell>
                                        <TableCell align="left">Stop Address</TableCell>
                                        <TableCell align="left">Voltage</TableCell>
                                        <TableCell align="left">Temperature</TableCell>
                                        <TableCell align="left">Data Setup Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="left">{row.startAddress}</TableCell>
                                        <TableCell align="left">{row.stopAddress}</TableCell>
                                        <TableCell align="left">{row.voltage}</TableCell>
                                        <TableCell align="left">{row.temperature}</TableCell>
                                        <TableCell align="left">{row.dataSetupTime}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <br/>
                            <Box xs={{margin: 1}}>
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
                                            value={values.memoryType}
                                            onChange={handleChange('memoryType')}
                                            label="Memory Type"
                                        >
                                            <option value="">Memory Type</option>

                                            {renderOptions(memoryTypes)}
                                        </select>
                                        {values.memoryType === '' ? (
                                            <p className="text-red-800 text-sm mt-1">
                                                * Type is required
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <select
                                            id="memory_brand_select"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                            value={values.memoryBrand}
                                            onChange={handleChange('memoryBrand')}
                                            label="Brand"
                                        >
                                            <option value="">Brand</option>
                                            {renderOptions(memoryBrands)}
                                        </select>
                                        {values.memoryBrand === '' ? (
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
                                            value={values.memoryModel}
                                            onChange={handleChange('memoryModel')}
                                        >
                                            <option selected value="">
                                                Model
                                            </option>
                                            {values.memoryType === 'FRAM'
                                                ? renderOptions(FRAMModels)
                                                : renderOptions(MRAMModels)}
                                        </select>
                                        {values.memoryModel === '' ? (
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
                                            name="memory label"
                                            id="memoryLabel"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder="Memory Lable"
                                            onChange={handleMemoryLabelChange('memoryLabel')}
                                            required
                                        />
                                        {values.memoryLabel === '' ? (
                                            <p className="text-red-800 text-sm mt-1">
                                                * Label is required
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            </Box>
                            <div className="flex items-center bg-white rounded-lg shadow-lg p-6">
                                <Typography
                                    className="mr-2 text-gray-900 font-semibold mb-1"
                                    htmlFor="mySelect"
                                >
                                    Select Board:
                                </Typography>
                                <select
                                    className="mr-2 py-2 px-4 border cursor-pointer  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    value={selectedDeviceId}
                                    onChange={handleOptionChange}
                                >
                                    <option value=""></option>
                                    {connectedDevices.map((device) => (
                                        <option key={device.id} value={device.id}>
                                            {device.device_label}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className={`ml-auto py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        !selectedDeviceId
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-blue-500 hover:bg-blue-600'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startTest(row.id);
                                    }}
                                    disabled={selectedDeviceId === ''}
                                >
                                    START
                                </button>
                            </div>

                            {/* <Button
                className="pt-5"
                size="medium"
                onClick={(e) => {
                  e.stopPropagation();
                  startTest(row.id);
                }}
              >
                Start
              </Button> */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TestLayoutMemoryTests = ({color, tests, type}) => {
    const StyledTableHead = styled(TableHead)(({theme}) => ({
        backgroundColor: color
    }));
    const StyledTable = styled(Table)(({theme}) => ({
        '&:last-child td, &:last-child th': {
            border: 0
        },
        borderColor: 'primary',
        marginTop: '5px'
    }));

    const StyledChip1 = styled(Chip)(({theme}) => ({
        borderColor: color
    }));

    const StyledChip2 = styled(Chip)(({theme}) => ({
        backgroundColor: color
    }));

    return (
        <React.Fragment>
            <Stack direction="row" spacing={1}>
                <StyledChip1 label={tests.length} variant="outlined"/>
                <StyledChip2 label={type}/>
            </Stack>

            {tests.length !== 0 ? (
                <TableContainer component={Paper}>
                    <StyledTable aria-label="collapsible table">
                        <StyledTableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Test Type</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </StyledTableHead>

                        <TableBody>
                            {tests.map((test) => (
                                <Row key={test.id} row={test}/>
                            ))}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
            ) : (
                <Alert severity="info">
                    This is an info alert — No records to display!
                </Alert>
            )}
        </React.Fragment>
    );
};

export default TestLayoutMemoryTests;
