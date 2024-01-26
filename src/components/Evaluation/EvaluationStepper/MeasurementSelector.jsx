import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import UploadIcon from '@mui/icons-material/Upload';
import FileDownloadOffIcon from '@mui/icons-material/FileDownloadOff';
import {
    FETCH_EVALUATED_DATA,
    FETCH_UPLOADED_TESTS
} from '../../../config'
import {Alert} from "@mui/lab";
import {fetch_get} from "../../Utils/AuthenticationUtils";
import LoadingClip from "../../Utils/LoadingClip";
import {Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';


const columns_cnt_pufs = (onClickFunction) => {
    return [
        {field: 'id', headerName: 'ID', width: 100},
        {
            field: 'testType',
            headerName: 'Test Type',
            width: 200
        },
        {
            field: 'testName',
            headerName: 'Test Name',
            width: 300
        },
        {
            field: 'wafer',
            headerName: 'Wafer',
            type: 'number',
            width: 150
        },
        {
            field: 'rowOnWafer',
            headerName: 'Row',
            type: 'number',
            width: 150
        },
        {
            field: 'columnOnWafer',
            headerName: 'Column',
            type: 'number',
            width: 150
        },
        {
            field: 'pufID',
            headerName: 'PUF ID',
            type: 'number',
            width: 150
        },
        {
            field: 'rowOnPUF',
            headerName: 'Row on PUF',
            type: 'number',
            width: 150
        },
        {
            field: 'columnOnPUF',
            headerName: 'Column on PUF',
            type: 'number',
            width: 150
        },
        {
            field: 'temperature',
            headerName: 'Temperature',
            type: 'number',
            width: 100
        },

        {
            field: 'iteration',
            headerName: 'Iterations',
            type: 'number',
            width: 100
        },
        {
            field: 'testConfig',
            headerName: 'Test Info',
            width: 100,
            renderCell: (params) => (
                <Button
                    style={{background: 'grey', color: 'white'}}
                    onClick={() => {
                        onClickFunction(params.row)
                    }}
                    className="statusButton text-white py-1 px-2 capitalize rounded-2xl text-md"
                >
                    Info
                </Button>
            )
        },
        {
            field: 'uploaded',
            headerName: 'Uploaded',
            width: 100,
            type: 'boolean',
            renderCell: (params) => (
                <span style={{color: params.value === true ? 'green' : 'red'}}>
        {params.value ? (
            <UploadIcon style={{color: 'green'}}/>
        ) : (
            <FileDownloadOffIcon style={{color: 'red'}}/>
        )}
      </span>
            )
        }
        /*{
          field: 'fileName',
          headerName: 'File',
          width: 100
        }*/
    ];
}

const columns_memory_pufs = (onClickFunction) => {
    return [
        {field: 'id', headerName: 'ID', width: 100},
        {
            field: 'testType',
            headerName: 'Test Type',
            width: 200
        },
        {
            field: 'testTitle',
            headerName: 'Test Title',
            width: 300
        },
        {
            field: 'initValue',
            headerName: 'Init Value',
            width: 200
        },
        {
            field: 'memoryType',
            headerName: 'Memory Type',
            width: 200
        },
        {
            field: 'manufacturer',
            headerName: 'Manufacturer',
            width: 200
        },
        {
            field: 'model',
            headerName: 'Model',
            width: 200
        },
        {
            field: 'memIdentifier',
            headerName: 'Memory Identifier',
            width: 200
        },
        {
            field: 'iterations',
            headerName: 'Iterations',
            width: 200
        },
        {
            field: 'testConfig',
            headerName: 'Test Info',
            width: 100,
            renderCell: (params) => (
                <Button
                    style={{background: 'grey', color: 'white'}}
                    onClick={() => {
                        onClickFunction(params.row)
                    }}
                    className="statusButton text-white py-1 px-2 capitalize rounded-2xl text-md"
                >
                    Info
                </Button>
            )
        },

        {
            field: 'uploaded',
            headerName: 'Uploaded',
            width: 200,
            type: 'boolean',
            renderCell: (params) => (
                <span style={{color: params.value === true ? 'green' : 'red'}}>
        {params.value ? (
            <UploadIcon style={{color: 'green'}}/>
        ) : (
            <FileDownloadOffIcon style={{color: 'red'}}/>
        )}
      </span>
            )
        }
    ];
}

export default function MeasurementSelector({updateIsStepWarning, evalType}) {

    const navigate = useNavigate()

    const [rows, setRows] = useState([]);
    const [loadingUploaded, setLoadingUploaded] = useState(true);
    const [loading, setLoading] = useState(true);

    const [uploadedMeasurments, setUploadedMeasurments] = useState([]);

    const [selected, setSelected] = useState(null);
    const [alertState, setAlertState] = useState(null);

    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    console.log('selected from local', selected);

    useEffect(() => {
        requestTests();
    }, []);

    useEffect(() => {
        requestUploadedMeasurements();
    }, []);

    let requestTests = async () => {

        await fetch_get(FETCH_EVALUATED_DATA + evalType, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((data) => {
            console.log('Available Data', data)
            if (data && data.processedData.length > 0) {
                const completed_tests = Object.values(data.processedData).reduce(
                    (acc, array) => acc.concat(array),
                    []
                );
                let processedData = [];
                if (completed_tests.length > 0) {
                    processedData = completed_tests.map(function (testObj) {
                            testObj.id = `INT_${testObj.id}`
                            return testObj
                        }
                    );


                    setRows(processedData);
                    console.log(processedData);
                    localStorage.removeItem('selectedMeasurements');
                }
            }
            setLoading(false);
        })
    };

    let requestUploadedMeasurements = async () => {

        await fetch_get(FETCH_UPLOADED_TESTS + evalType, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((data) => {
            if (data) {
                const measurements = Object.values(data.processedData).reduce(
                    (acc, array) => acc.concat(array),
                    []
                );


                console.log('Uploaded MeasurementSelector:', measurements);
                const processedData = measurements.map(function (testObj) {
                        testObj.id = `EXT_${testObj.id}`
                        testObj.uploaded = true
                        return testObj
                    }
                );
                setUploadedMeasurments(processedData);
            }
            setLoadingUploaded(false);
        })
    };

    const handleSelectAllClick = (event) => {
        console.log(event.length, ' Selected');
        if (event.length > 0) {
            updateIsStepWarning(false);
        } else {
            updateIsStepWarning(true);
        }

        const selectedRows = rows
            .concat(uploadedMeasurments)
            .filter((row) => event.includes(row.id));
        console.log(
            '🚀 ~ file: MeasurementSelector.jsx:137 ~ handleSelectAllClick ~ selectedRows:',
            selectedRows
        );
        setSelected(selectedRows);
        localStorage.removeItem('selectedMeasurements');
        const selectedMeasurements = [];
        selectedMeasurements.push(...selectedRows);
        localStorage.setItem(
            'selectedMeasurements',
            JSON.stringify(selectedMeasurements)
        );
    };


    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)
    if (loading || loadingUploaded)
        return (<LoadingClip/>);

    function capitalizeEachWord(sentence) {
        // Split the sentence into an array of words
        let words = sentence.split(' ');

        // Capitalize the first letter of each word
        let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

        // Join the capitalized words back into a sentence
        let capitalizedSentence = capitalizedWords.join(' ');

        return capitalizedSentence;
    }

    const get_layout = () => {
        if (evalType === 'cnt_puf')
            return columns_cnt_pufs((parameters) => {
                navigate('/testDetail',
                    {
                        state: {
                            testTitle: parameters['testTitle'],
                            testCategory: 'cntpuf',
                            testDetails: [
                                {'key': 'Identifier', 'value': parameters['id']},
                                {'key': 'Test Type', 'value': parameters['testType']},
                                {'key': 'Wafer', 'value': parameters['wafer']},
                                {'key': 'Row on Wafer', 'value': parameters['rowOnWafer']},
                                {'key': 'Column on Wafer', 'value': parameters['columnOnWafer']},
                                {'key': 'PUF ID', 'value': parameters['pufID']},
                                {'key': 'Row on PUF', 'value': parameters['rowOnPUF']},
                                {'key': 'Column on PUF', 'value': parameters['columnOnPUF']},
                                {'key': 'Temperature', 'value': parameters['temperature']},
                                {'key': 'Iteration', 'value': parameters['iteration']},
                            ]
                        }
                    })
                }
            )
        else if (evalType === 'memory')
            return columns_memory_pufs((parameters) => {
                navigate('/testDetail',
                    {
                        state: {
                            testTitle: parameters['testTitle'],
                            testCategory: 'memory',
                            testDetails: [
                                {'key': 'Identifier', 'value': parameters['id']},
                                {'key': 'Test Type', 'value': parameters['testType']},
                                {'key': 'Memory Type', 'value': parameters['memoryType']},
                                {'key': 'Memory Model', 'value': parameters['model']},
                                {'key': 'Identifier', 'value': parameters['memIdentifier']},
                                {'key': 'Initialization Value', 'value': parameters['initValue']},
                                ...parameters['testConfig'].flatMap((m) =>
                                    Object.entries(m).map(([key, value]) => ({
                                        'key': capitalizeEachWord(key.replace('_', ' ')),
                                        'value': value
                                    }))
                                )
                            ]
                        }
                    })
            })
    }

    return (
        <div>
            <Box sx={{width: '95%', marginLeft: '2%', marginRight: '100%', marginTop: '20px'}}>
                <DataGrid
                    rows={rows.concat(uploadedMeasurments)}
                    columns={get_layout()}
                    onRowSelectionModelChange={handleSelectAllClick}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 15
                            }
                        }
                    }}
                    autoHeight={true}
                    pageSizeOptions={[15, 30, 45]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box></div>
    );
}
