import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {FETCH_START_EVALUATION} from '../../../config'
import {
    Button,
    TextField
} from '@mui/material';
import {fetch_post} from "../../Utils/AuthenticationUtils";
import {Alert} from "@mui/lab";
import EvaluationFormCNTs from "./CNTs/EvaluationFormCNTs";
import EvaluationFormMemories from "./Memories/EvaluationFormMemories";
import {useStyles} from "../../Utils/StyledComponents";

const EvaluationSelector = ({isStepWarning, evalType}) => {
    const styleClasses = useStyles();

    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [evaluationData, setEvaluationData] = useState({
        title: '',
        uniformityChallenges: ['dataSetupTime'],
        robustnessChallenges: ['dataSetupTime'],
        uniquenessChallenges: ['dataSetupTime'],
        evaluationMethod: 'rawFigure',
        selectedIteration: 1,
    });

    const selectedMeasurements = JSON.parse(localStorage.getItem('selectedMeasurements')) || [];
    const [isValidForm, setIsFormValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        validateForm();
    }, [evaluationData.title, evaluationData.uniformityChallenges, evaluationData.robustnessChallenges, evaluationData.uniquenessChallenges]);

    const handleSelectIteration = (event) => {
        setEvaluationData({...evaluationData, selectedIteration: event.target.value});
    };

    const handleSelectEvaluationMethod = (event) => {
        setEvaluationData({...evaluationData, evaluationMethod: event.target.value});
    };

    const handleInputChange = (event) => {
        setEvaluationData({...evaluationData, [event.target.name]: event.target.value});
    };

    const handleChallengesChange = (event, type) => {
        setEvaluationData({...evaluationData, [`${type}Challenges`]: event.target.value});
    };

    const validateForm = () => {
        const {title, uniformityChallenges, robustnessChallenges, uniquenessChallenges} = evaluationData;
        setIsFormValid(title.trim() && uniformityChallenges.length > 0 && robustnessChallenges.length > 0 && uniquenessChallenges.length > 0);
    };


    const startEvaluation = async () => {
        const requestData = {
            title: evaluationData.title,
            type: evalType,
            measurements: selectedMeasurements,
            evaluationMethod: evaluationData.evaluationMethod,
            iteration: evaluationData.selectedIteration
        };

        await fetch_post(FETCH_START_EVALUATION, setAlertIsSet, setAlertMessage, requestData).then((retData) => {
            if (retData) {
                const taskId = retData['task_id'];
                console.log('🚀 ~ file: EvaluationStepper.jsx:106 ~ startEvaluation ~ taskId:', taskId);
                navigate('/results');
            }
        });
    };


    const selectEvaluationForm = (evalType) => {
        if (evalType === 'cnt_puf') {
            const iterations = Array.from({length: selectedMeasurements[0].iteration}, (_, index) => index + 1);
            return <EvaluationFormCNTs
                iterations={iterations}
                eventHandlers={{
                    'handleSelectEvaluationMethod': handleSelectEvaluationMethod,
                    'handleSelectIteration': handleSelectIteration
                }}
                evaluationData={evaluationData}
            />;
        }
        if (evalType === 'memory') {
            return <EvaluationFormMemories
                evaluationData={evaluationData}
                eventHandler={handleChallengesChange}
            />;
        }
    };


    if (alertIsSet) return (<div><Alert severity="error">{alertMessage}</Alert></div>)

    return (
        <React.Fragment>
            <form className={styleClasses.form}>
                <TextField
                    label="Evaluation Title"
                    name="title"
                    value={evaluationData.title}
                    variant="standard"
                    onChange={handleInputChange}
                    focused
                    required
                />

                {selectEvaluationForm(evalType)}

                <Button
                    className={styleClasses.button}
                    variant="contained"
                    disabled={!isValidForm || isStepWarning}
                    onClick={startEvaluation}
                >
                    Start The Evaluation
                </Button>
            </form>
        </React.Fragment>
    );
};

export default EvaluationSelector;
