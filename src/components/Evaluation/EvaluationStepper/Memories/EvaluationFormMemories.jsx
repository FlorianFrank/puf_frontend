import React from "react";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import {useStyles} from "../../../Utils/StyledComponents";

const challengesData = [
    {label: 'Data Setup Time', value: 'dataSetupTime'},
    {label: 'Voltage', value: 'voltage'},
    {label: 'Temperature', value: 'temperature'}
];

const EvaluationFormMemories = ({evaluationData, eventHandler}) => {
    const styleClasses = useStyles();

    const renderFormControl = (label, challenges, type) => (
        <FormControl
            className={styleClasses.formControl}
            required
            variant="standard"
        >
            <InputLabel id={`select-${type}-challenges`}>{label}</InputLabel>
            <Select
                labelId={`select-${type}-challenges`}
                multiple
                value={challenges}
                onChange={(event) => eventHandler(event, type)}
                renderValue={(selected) => selected.join(', ')}
            >
                {challengesData.map((challenge) => (
                    <MenuItem key={challenge.value} value={challenge.value}>
                        {challenge.label}
                    </MenuItem>
                ))}
            </Select>
            {challenges.length === 0 && (
                <FormHelperText error>
                    Select at least one {type} challenge
                </FormHelperText>
            )}
        </FormControl>
    );

    return (
        <React.Fragment>
            {renderFormControl('Uniformity Challenges', evaluationData.uniformityChallenges, 'uniformity')}
            <br/>
            {renderFormControl('Robustness Challenges', evaluationData.robustnessChallenges, 'robustness')}
            <br/>
            {renderFormControl('Uniqueness Challenges', evaluationData.uniquenessChallenges, 'uniqueness')}
        </React.Fragment>
    );
};

export default EvaluationFormMemories;
