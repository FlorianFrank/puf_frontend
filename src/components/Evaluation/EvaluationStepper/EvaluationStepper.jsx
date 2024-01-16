import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {EvaluationSelector, Header} from '../../index';
import MeasurementSelector from './MeasurementSelector';
import MeasurementFilter from './MeasurementFilter';

const steps = [
    'MeasurementSelector',
    'Selected MeasurementSelector',
    'Select Challenges & Evaluate'
];

const StepIndex = {
    SELECT_MEASUREMENTS: 0,
    FILTER_MEASUREMENTS: 1,
    APPLY_EVALUATION: 2
};

export default function EvaluationStepper({evalType}) {
    const [activeStep, setActiveStep] = useState(0);
    const [isStepWarning, setIsStepWarning] = useState(true);
    const [measurements, setMeasurements] = useState([]);

    useEffect(() => {
        const storedMeasurements = JSON.parse(localStorage.getItem('selectedMeasurements')) || [];
        setMeasurements(storedMeasurements);
    }, []);

    const handleNext = () => {
        switch (activeStep) {
            case StepIndex.SELECT_MEASUREMENTS:
                setActiveStep(StepIndex.FILTER_MEASUREMENTS);
                break;
            case StepIndex.FILTER_MEASUREMENTS:
                setActiveStep(StepIndex.APPLY_EVALUATION)
                break;
            default:
                console.error('Error could not determine next step');
        }
    };

    const handleBack = () => {
        switch (activeStep) {
            case StepIndex.APPLY_EVALUATION:
                setActiveStep(StepIndex.FILTER_MEASUREMENTS)
                break;
            case StepIndex.FILTER_MEASUREMENTS:
                setActiveStep(StepIndex.SELECT_MEASUREMENTS)
                break;
            default:
                console.log('Error could not handleBack')
        }
    };

    const handleIsStepWarning = (value) => {
        console.log(
            '🚀 ~ file: EvaluationStepper.jsx:56 ~ handleUpdateRobustnessChallenges ~ value:',
            value
        );
        setIsStepWarning(value);
    };

    const getStepContent = (step) => {

        if (step === StepIndex.SELECT_MEASUREMENTS)
            return <MeasurementSelector updateIsStepWarning={handleIsStepWarning} evalType={evalType}/>;

        if (step === StepIndex.FILTER_MEASUREMENTS)
            return <MeasurementFilter evalType={evalType}/>;

        if (step === StepIndex.APPLY_EVALUATION)
            return (
                <Box sx={{width: '90%', marginLeft: '5%', marginTop: '20px'}}>
                    <EvaluationSelector
                        measurements={measurements}
                        isStepWarning={isStepWarning}
                        evalType={evalType}
                    />
                </Box>
            );

        return 'Unknown step';
    };

    return (
        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            <Header category="Evaluation" title="MeasurementSelector"/>
            <Box sx={{width: '100%'}}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const labelProps = {};
                        if (index !== 0 && isStepWarning) {
                            labelProps.optional = (
                                <Typography variant="caption" color="#c2410c">
                                    No measurement selected yet
                                </Typography>
                            );
                        }

                        return (
                            <Step key={label}>
                                <StepLabel
                                    color={index !== 0 && isStepWarning ? '#c2410c' : '#c24100'}
                                    {...labelProps}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <React.Fragment>
                    <div sx={{mt: 2, mb: 1, py: 1}}>{getStepContent(activeStep)}</div>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === StepIndex.SELECT_MEASUREMENTS}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button
                            onClick={handleNext}
                            sx={{mr: 1}}
                            disabled={activeStep === StepIndex.APPLY_EVALUATION}
                        >
                            Next
                        </Button>
                    </Box>
                </React.Fragment>
            </Box>
        </div>
    );
}
