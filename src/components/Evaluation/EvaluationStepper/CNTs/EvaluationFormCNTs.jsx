import React from "react";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {useStyles} from "../../../Utils/StyledComponents";

const EvaluationFormCNTs = ({iterations, eventHandlers, evaluationData}) => {
    const styleClasses = useStyles();

    // TODO provide this from the backend
    const evaluationMethods = [
        {label: 'Visualization of Raw data', value: 'rawFigure'},
        {label: 'Quantization (2-States)',   value: 'quantize_2_states'},
        {label: 'Quantization (3-States)',   value: 'quantize_3_states'},
        {label: 'Wafer Visualizer',          value: 'waferVisualizer'}, // Corrected duplicate value
    ];

    return (
        <React.Fragment>
            <FormControl className={styleClasses.formControl} required variant="standard">
                <InputLabel id="select-uniformity-challenges">
                    Evaluation Method
                </InputLabel>
                <Select
                    labelId="select-uniformity-challenges"
                    value={evaluationData.evaluationMethod}
                    onChange={eventHandlers.handleSelectEvaluationMethod}
                >
                    {evaluationMethods.map((method) => (
                        <MenuItem key={method.value} value={method.value}>
                            {method.label}
                        </MenuItem>
                    ))}
                </Select>
                {evaluationMethods.length === 0 && (
                    <FormHelperText error>
                        Select at least one evaluation method
                    </FormHelperText>
                )}
            </FormControl>

            {evaluationData.evaluationMethod === 'rawFigure' && (
                <FormControl className={styleClasses.formControl} required variant="standard">
                    <InputLabel id="select-iteration">Select Iteration</InputLabel>
                    <Select
                        labelId="select-iteration"
                        value={evaluationData.selectedIteration}
                        onChange={eventHandlers.handleSelectIteration}
                    >
                        {iterations.map((iteration) => (
                            <MenuItem key={iteration} value={iteration}>
                                {iteration}
                            </MenuItem>
                        ))}
                    </Select>
                    {iterations.length === 0 && (
                        <FormHelperText error>
                            Select at least one iteration
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        </React.Fragment>
    );
};

export default EvaluationFormCNTs;
