import React, {useState, useEffect} from 'react';
import {Button, CircularProgress} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {Table, TableContainer, TableHead, TableRow, TableCell, Chip, TableBody} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import {format} from 'date-fns'; // Import the format function from date-fns
import {Header} from '../../components';
import {
    FETCH_DELETE_EVALUATION_RESULT, FETCH_DOWNLOAD_RESULT, FETCH_EVALUATION_RESULT,
    FETCH_EVALUATION_STATUS
} from "../../config";
import {Alert} from "@mui/lab";
import LoadingClip from "../Utils/LoadingClip";
import {fetch_delete, fetch_get} from "../Utils/AuthenticationUtils";
import {getStatusChipColor, useStylesResult} from "../Utils/StyledComponents";
import {FETCH_RESULTS_INTERVAL} from "../../data/general_config";

const Results = () => {
    const [tasks, setTasks] = useState([]);
    const [alertState, ] = useState(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const classes = useStylesResult();

    const fetchTasks = async () => {
        await fetch_get(FETCH_EVALUATION_STATUS, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            if (retData) {
                setTasks(retData['tasks']);
                setLoading(false)
            }
        })
    };

    useEffect(() => {
        fetchTasks().catch((errorMsg) => {
            console.log('Error occurred when calling fetchTasks: ', errorMsg)
        })

        const intervalId = setInterval(fetchTasks, FETCH_RESULTS_INTERVAL);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleResultButtonClick = (task) => {
        fetch_get(FETCH_EVALUATION_RESULT, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            if (retData) {
                navigate(`/metrics`, {
                    state: {
                        id: task.id, title: task.title, startTime: formatDateTime(task.startTime),
                        stopTime: formatDateTime(task.stopTime)
                    },
                });
            }
        })
    };

    const formatDateTime = (dateTime) => {
        return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss'); // Format the date and time
    };

    const handleDownload = async (task) => {
        fetch_get(FETCH_DOWNLOAD_RESULT, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            if (retData) {
                const element = document.createElement('a');
                const file = new Blob([JSON.stringify(retData)], {type: 'text/json'});
                element.href = URL.createObjectURL(file);
                element.download = `${task.title}.json`;
                document.body.appendChild(element); // Required for this to work in FireFox
                element.click();
            }
        })
    };

    const handleDelete = async (task) => {
        // Perform your delete operation here
        fetch_delete(FETCH_DELETE_EVALUATION_RESULT + task.id, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            if (retData) {
                setTasks(tasks.filter(obj => obj.id !== task.id))
            }
        })
    };

    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)
    if (loading)
        return (<LoadingClip/>);

    return (
        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            {(alertState) ? alertState : ''}
            <Header category="Evaluation" title="Results"/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>Finish Time</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell aline="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.map((task) => (
                            <TableRow key={task.task_id} className={classes.tableRow}>
                                <TableCell>{task.id}</TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{formatDateTime(task.startTime)}</TableCell>
                                <TableCell>{formatDateTime(task.stopTime)}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={task.status}
                                        style={{
                                            background: getStatusChipColor(task.status).background,
                                            color: getStatusChipColor(task.status).color
                                        }}
                                        icon={
                                            task.status === 'PENDING' ? (
                                                <CircularProgress size={20}/>
                                            ) : null
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        className={classes.resultButton}
                                        variant="outlined"
                                        color="primary"
                                        disabled={task.status !== 'finished'}
                                        onClick={() => handleResultButtonClick(task)}
                                    >
                                        View Result
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleDownload(task)}
                                        color="primary"
                                    >
                                        <DownloadIcon/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            handleDelete(task)
                                        }}
                                        color="secondary"
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Results;
