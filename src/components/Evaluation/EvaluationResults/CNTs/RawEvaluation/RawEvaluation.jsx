import React, {useState, useEffect} from 'react';

import FigurePlotter from "../../../Visualizer/FigurePlotter";
import {
    FETCH_CONNECTED_CNT_MEASUREMENTS,
    FETCH_VISUALIZATION_RESULT
} from "../../../../../config";
import {Header} from "../../../../index";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import {useLocation} from "react-router-dom";
import {BarChart} from "@material-ui/icons";
import {Alert} from "@mui/lab";
import LoadingClip from "../../../../Utils/LoadingClip";
import {fetch_get} from "../../../../Utils/AuthenticationUtils";
import MeasurementTemplate from "./MeasurementTemplate";
import RawEvaluationTable from "./RawEvaluationTable";
import TestStatusTable from "../../TestStatusTable";
import {StyledCard} from "../../../../Utils/StyledComponents";

const RawEvaluation = () => {
    let location = useLocation();

    const {id, title, startTime, stopTime} = location.state || {};
    const identifier = id || -1;

    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [visualization, setVisualization] = useState({});
    const [evaluationData, setEvaluationData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedStates, setExpandedStates] = useState({
        expanded: true,
        expandEvaluationTable: true
    });
    const {expanded, expandEvaluationTable} = expandedStates;
    const [connectedMeasurements, setConnectedMeasurements] = useState([]);


    let requestVisualization = async () => {
        await fetch_get(FETCH_VISUALIZATION_RESULT + identifier, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                setVisualization(retData.chart)
                console.log(retData['evaluationStatus'])
                setEvaluationData(retData['evaluationStatus'])
                setLoading(false)
            }
        })
    };

    const requestConnectedMeasurements = async () => {

        await fetch_get(FETCH_CONNECTED_CNT_MEASUREMENTS + identifier, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                console.log(retData.measurements)
                setConnectedMeasurements(retData.measurements)
            }
        })
    };


    useEffect(() => {
        requestVisualization().catch((error) => {
            console.log('requestVisualization caused an error: ', error)
        })
        requestConnectedMeasurements().catch((error) => {
            console.log('requestConnectedMeasurements caused an error: ', error)
        })
    }, []);

    const fig_name = "fig_el427345810798888193429725"


    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)
    if (loading)
        return (<LoadingClip/>);

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
                    <TestStatusTable identifier={identifier} startTime={startTime} stopTime={stopTime}/>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" style={{paddingBottom: '1%'}}>
                        Selected Test results
                    </Typography>
                    <MeasurementTemplate connectedMeasurements={connectedMeasurements}
                                         setExpanded={(value) => setExpandedStates({
                                             ...expandedStates,
                                             expanded: value
                                         })} expanded={expanded}/>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" style={{paddingBottom: '1%'}}>
                        Evaluation Results
                    </Typography>
                    <RawEvaluationTable evaluationData={evaluationData} setExpanded={(value) => setExpandedStates({
                        ...expandedStates,
                        expandEvaluationTable: value
                    })} expanded={expandEvaluationTable}/>
                </CardContent>
                <CardContent>
                    <Typography variant="h6" color="text.secondary" style={{paddingBottom: '1%'}}>
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