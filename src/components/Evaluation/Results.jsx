import React, {useState, useEffect} from 'react';
import {Button, CircularProgress, makeStyles} from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Chip,
    TableBody
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import {format} from 'date-fns'; // Import the format function from date-fns
import {Header} from '../../components';
import {
    BACKEND_IP_ADDRESS,
    DELETE_EVALUATION_RESULT,
    FETCH_EVALUATION_RESULT,
    FETCH_EVALUATION_STATUS
} from "../../config";
import {Alert} from "@mui/lab";


const useStyles = makeStyles((theme) => ({
    completed: {
        backgroundColor: '#c8e6c9' // Green background for completed tasks
    },
    inProgress: {
        backgroundColor: '#fff' // White background for tasks in progress
    },
    resultButton: {
        marginLeft: theme.spacing(2) // Add some spacing between cells
    },
    tableRow: {
        '&:not(:last-child)': {
            marginBottom: theme.spacing(1) // Add margin-bottom to all rows except the last one
        }
    }
}));

const Results = () => {
    const [tasks, setTasks] = useState([]);
    const [alertState, setAlertState] = useState(null)
    const navigate = useNavigate();

    const classes = useStyles();

    const fetchTasks = async () => {
        const fetchStr = FETCH_EVALUATION_STATUS
        try {
            const response = await fetch(fetchStr);
            const data = await response.json();
            setTasks(data.tasks);
        } catch (error) {
            setAlertState(<Alert severity="warning">{'Could not fetch from ' + fetchStr + ' (' + error + ')'}</Alert>)
        }
    };

    useEffect(() => {
        // Fetch tasks initially
        fetchTasks();

        // Set up interval to fetch tasks every 5 seconds
        const intervalId = setInterval(fetchTasks, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleResultButtonClick = (task) => {
        const fetchStr = FETCH_EVALUATION_RESULT
        fetch(fetchStr)
            .then((response) => response.json())
            .then((data) => {
                navigate(`/metrics`, {
                    state: {
                        id: task.id, title: task.title, startTime: formatDateTime(task.startTime),
                        stopTime: formatDateTime(task.stopTime)
                    },

                });
            })
            .catch((error) => {
                setAlertState(<Alert
                    severity="warning">{'Could not fetch from ' + fetchStr + ' (' + error + ')'}</Alert>)
            }); // Replace 1 with the desired ID
    };

    const getStatusChipColor = (status) => {
        switch (status) {
            case 'finished':
                return {background: '#4caf50', color: '#ffffff'}; // Green background, white text
            case 'running':
                return {background: '#ffc107', color: '#000000'}; // Yellow background, black text
            case 'failed':
                return {background: '#f44336', color: '#ffffff'}; // Red background, white text
            default:
                return {background: '#ffffff', color: '#000000'}; // Default background and text color
        }
    };

    const formatDateTime = (dateTime) => {
        return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss'); // Format the date and time
    };

    const handleDownload = async (task) => {
        console.log('download', task);
        const fetchStr = 'http://' + BACKEND_IP_ADDRESS + ':8000/brokerApi/evaluation-result/' + task.id + '/'
        try {
            // Replace this with your API request
            const response = await fetch(
                fetchStr
            );
            if (!response.ok) {
                console.log("Response not ok")
            }
            const data = await response.json();

            const element = document.createElement('a');
            const file = new Blob([JSON.stringify(data)], {type: 'text/json'});
            element.href = URL.createObjectURL(file);
            element.download = `${task.title}.json`;
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
        } catch (error) {
            setAlertState(<Alert severity="warning">{'Could not fetch from ' + fetchStr + ' (' + error + ')'}</Alert>)
        }
    };

    const handleDelete = async (task) => {
        // Perform your delete operation here
        console.log('Delete clicked');

        const fetchStr = DELETE_EVALUATION_RESULT + task.id
        try {
            const response = await fetch(fetchStr,
                {
                    method: 'DELETE'
                }
            );
            if (!response.ok) {
                setAlertState(<Alert severity="warning">{'Network response != Ok'}</Alert>)

                throw new Error('Network response was not ok');
            }
            setTasks(tasks.filter(obj => obj.id !== task.id))
        } catch (error) {
            setAlertState(<Alert severity="warning">{'Could not fetch from ' + fetchStr + ' (' + error + ')'}</Alert>)
        }
    };

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
