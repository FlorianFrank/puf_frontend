import React, {useState, useEffect} from 'react';

import FigurePlotter from "../../Visualizer/FigurePlotter";
import {FETCH_CONNECTED_MEASUREMENTS, FETCH_EVALUATION_RESULT, FETCH_VISUALIZATION_RESULT} from "../../../../config";
import {Header} from "../../../index";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';

import TableRow from "@mui/material/TableRow";
import {Checkbox} from "@mui/material";
import TableContainer from '@mui/material/TableContainer';

import Table from '@mui/material/Table';
import {useLocation} from "react-router-dom";
import {BarChart} from "@material-ui/icons";

const RawEvaluation = () => {
    let location = useLocation();

    const identifier = location.state?.id || -1;
    const title = location.state?.title || {};
    const startTime = location.state?.startTime || 'undefined';
    const stopTime = location.state?.stopTime || 'undefined';

    const [visualization, setVisualization] = useState({})
    const [evaluationData, setEvaluationData] = useState([])

    const [expanded, setExpanded] = useState(true);
    const [expandEvalTable, setexpandEvalTable] = useState(true);

    const [connectedMeasurements, setConnectedMeasurements] = useState([]);

    let requestVisualization = async () => {
        const fetchStr = FETCH_VISUALIZATION_RESULT + identifier
        console.log('FETCH STR ' + fetchStr)
        fetch(fetchStr)
            .then((response) => {
                return response.json()
            }).then(jsonResponse => {
            setVisualization(jsonResponse.chart)
            console.log(jsonResponse.evaluationStatus)
            setEvaluationData(jsonResponse.evaluationStatus)
        })
            .catch((error) => {
                console.log(error)

            })
    };

    let requestConnectedMeasurements = async () => {
        fetch(FETCH_CONNECTED_MEASUREMENTS + identifier)
            .then((response) => {
                return response.json()
            }).then(jsonResponse => {
            console.log(jsonResponse.measurements)
            setConnectedMeasurements(jsonResponse.measurements)
        })
            .catch((error) => {
                console.log(error)

            })
    };


    useEffect(() => {
        requestVisualization();
        requestConnectedMeasurements();
    }, []);

    const fig_name = "fig_el427345810798888193429725"

    const StyledCard = styled(Card)(({}) => ({
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

    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14
        }
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0
        }
    }));

    const StyledCheckbox = styled(Checkbox)(({theme}) => ({
        color: 'white' // For example, set the default color to pink
    }));


    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Evaluation" title="Carbon Nanotubes"/>
            <StyledCard sx={{width: '100%'}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="chip">
                            <BarChart/>
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={title}
                    subheader={'Raw result'}
                />
                <CardContent>
                    <Table style={{width: '30%'}}>
                        <tr>
                            <td>
                                <Typography variant="body2" color="text.secondary">
                                    <b>Test ID:</b>
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body2" color="text.secondary" style={{'margin-left': '2%'}}>
                                    {identifier}
                                </Typography>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Typography variant="body2" color="text.secondary">
                                    <b>Start Time:</b>
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body2" color="text.secondary" style={{'margin-left': '2%'}}>
                                    {startTime}
                                </Typography>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Typography variant="body2" color="text.secondary">
                                    <b>Finish Time:</b>
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="body2" color="text.secondary" style={{'margin-left': '2%'}}>
                                    {stopTime}
                                </Typography>
                            </td>
                        </tr>
                    </Table>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" style={{'padding-bottom': '1%'}}>
                        Selected Test results
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{width: '100%'}} aria-label="customized table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell
                                        align="left"
                                    >
                                        ID
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Test Type
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Test Name
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Wafer
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Row
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Column
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        PUF ID
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Row on PUF
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Column on PUF
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Temperature
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Iterations
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Selected Iteration
                                    </StyledTableCell>

                                    <StyledTableCell align="center" rowSpan={2}>
                                        <StyledCheckbox
                                            indeterminate={
                                                true
                                            }
                                            checked={
                                                true
                                            }
                                            onChange={() => {
                                                setExpanded(!expanded)
                                            }}
                                        />{' '}
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            {(expanded) ? <TableBody>
                                {connectedMeasurements.map((measurement) => (
                                    <StyledTableRow>
                                        <React.Fragment>
                                            <StyledTableCell key={0} align="left">
                                                {measurement['id']}
                                            </StyledTableCell>
                                            <StyledTableCell key={1} align="left">
                                                {measurement['testType']}
                                            </StyledTableCell>
                                            <StyledTableCell key={1} align="left">
                                                {measurement['testTitle']}
                                            </StyledTableCell>
                                            <StyledTableCell key={2} align="left">
                                                {measurement['wafer']}
                                            </StyledTableCell>
                                            <StyledTableCell key={3} align="left">
                                                {measurement['row']}
                                            </StyledTableCell>
                                            <StyledTableCell key={4} align="left">
                                                {measurement['column']}
                                            </StyledTableCell>
                                            <StyledTableCell key={5} align="left">
                                                {measurement['pufID']}
                                            </StyledTableCell>
                                            <StyledTableCell key={6} align="left">
                                                {measurement['rowOnPUF']}
                                            </StyledTableCell>
                                            <StyledTableCell key={7} align="left">
                                                {measurement['columnOnPUF']}
                                            </StyledTableCell>
                                            <StyledTableCell key={8} align="left">
                                                {measurement['temperature']}
                                            </StyledTableCell>
                                            <StyledTableCell key={9} align="left">
                                                {measurement['iterations']}
                                            </StyledTableCell>
                                            <StyledTableCell key={10} align="left">
                                                {measurement['selectedIteration']}
                                            </StyledTableCell>
                                        </React.Fragment>
                                    </StyledTableRow>))}
                            </TableBody> : ''}
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" style={{'padding-bottom': '1%'}}>
                        Evaluation Results
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{width: '100%'}} aria-label="customized table">
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell
                                        align="left"
                                    >
                                        VDS
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Min
                                    </StyledTableCell>
                                    <StyledTableCell align="left" rowSpan={2}>
                                        Max
                                    </StyledTableCell>

                                    <StyledTableCell align="center" rowSpan={2}>
                                        <StyledCheckbox
                                            indeterminate={
                                                true
                                            }
                                            checked={
                                                true
                                            }
                                            onChange={() => {
                                                setexpandEvalTable(!expandEvalTable)
                                            }}
                                        />{' '}
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            {(expandEvalTable) ? <TableBody>

                                {evaluationData.map((evalData) => (
                                    <StyledTableRow>
                                        <React.Fragment>
                                            <StyledTableCell key={0} align="left">
                                                {evalData['vds']}
                                            </StyledTableCell>
                                            <StyledTableCell key={1} align="left">
                                                {evalData['min']}
                                            </StyledTableCell>
                                            <StyledTableCell key={1} align="left">
                                                {evalData['max']}
                                            </StyledTableCell>
                                        </React.Fragment>
                                    </StyledTableRow>))}
                            </TableBody> : ''}
                        </Table>
                    </TableContainer>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" style={{'padding-bottom': '1%'}}>
                        Visualization
                    </Typography>
                    <FigurePlotter visualizerJson={visualization} width={800} height={600}
                                   fig_name={fig_name}/>
                    <div id={fig_name}/>
                </CardContent>
            </StyledCard>
        </div>
    );
};

export default RawEvaluation;