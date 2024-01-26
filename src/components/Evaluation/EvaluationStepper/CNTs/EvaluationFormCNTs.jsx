import React, {useEffect, useState} from "react";
import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {ColorPicker} from "material-ui-color";

import {useStyles} from "../../../Utils/StyledComponents";
import {fetch_get} from "../../../Utils/AuthenticationUtils";
import {FETCH_EVALUATION_CONFIG} from "../../../../config";
import {Alert} from "@mui/lab";
import LoadingClip from "../../../Utils/LoadingClip";
import {colorMap} from "../../../../data/visualization_config";

const EvaluationFormCNTs = ({iterations, eventHandlers, evaluationData}) => {
    const styleClasses = useStyles();

    const [evaluationType, setEvaluationType] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // TODO provide this from the backend
    const evaluationMethods = [
        {label: 'Visualization of Raw data', value: 'rawFigure'},
        {label: 'Quantization (2-States)', value: 'quantize_2_states'},
        {label: 'Quantization (3-States)', value: 'quantize_3_states'},
        {label: 'Wafer Visualizer', value: 'waferVisualizer'}, // Corrected duplicate value
    ];

    const [selectedProperties, setSelectedProperties] = useState({})

    const handleChange = (name) => (event) => {
        setSelectedProperties({...selectedProperties, [name]: event.target.value});
    };

    const handleChangeColorPicker = (name) => (event) => {
        setSelectedProperties({...selectedProperties, [name]: event});
    };

    const fetchEvaluationConfig = async (testType) => {
        await fetch_get(FETCH_EVALUATION_CONFIG + '?testType=' + testType, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                setEvaluationType(retData);
                setIsLoading(false)
            }
        })
    };

    useEffect(() => {
        fetchEvaluationConfig('rawFigure').catch((error) => {
            console.log('Error while calling fetchEvaluationConfig: ' + error)
        })
    }, [])

    const renderSelect = (label, title, values, defaultValue) => {
        return <div className="flex">
                <span style={{width: '400px'}}
                      className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {title}
                </span>
            <Select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={(!selectedProperties[label]) ? defaultValue : selectedProperties[label]}
                onChange={handleChange(label)}
            >

                {values.map((v) => {
                    return <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                })}
            </Select>
        </div>
    }

    const renderInput = (label, title, defaultValue) => {
        return <div className="flex">
                <span style={{width: '276px'}}
                      className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {title}
                </span>
            <input
                type='text'
                id={label}
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={(!selectedProperties[label]) ? defaultValue : selectedProperties[label]}
                onChange={handleChange(label)}
            />
        </div>
    }

    const renderColorPicker = (label, title, defaultValue) => {
        return <div className="flex">
                <span style={{width: '277px'}}
                      className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {title}
                </span>
            <ColorPicker style={{width: '100%'}}
                         defaultValue={defaultValue}
                         colorPalette={colorMap}
                         value={(!selectedProperties[label]) ? defaultValue : selectedProperties[label]}
                         onChange={handleChangeColorPicker(label)}
            /></div>
    }

    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)

    if (isLoading)
        return (<LoadingClip/>);


    return (
        (<React.Fragment>
            <FormControl className={styleClasses.formControl} required variant="standard">
                <InputLabel id="select-uniformity-challenges">
                    Evaluation Method
                </InputLabel>
                <Select
                    labelId="select-uniformity-challenges"
                    value={evaluationData.evaluationMethod}
                    onChange={(v) => {
                        setIsLoading(true)
                        eventHandlers.handleSelectEvaluationMethod(v)
                        fetchEvaluationConfig(v.target.value).catch((error) => {
                            console.log('Error while calling fetchEvaluationConfig: ' + error)
                        })

                    }}
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

            {evaluationData.evaluationMethod === evaluationType.value && (

                <FormControl className={styleClasses.formControl} required variant="standard">
                    {evaluationType.properties.map((element) => {
                        return (element.type === 'select') ? (
                            renderSelect(element.label, element.name, element.values, element.default)
                        ) : (element.type === 'input') ? renderInput(element.label, element.name, element.default) :
                            (element.type === 'color_picker') ? renderColorPicker(element.label, element.name, element.default) : ''
                    })}
                </FormControl>)}
        </React.Fragment>)
    );
};

export default EvaluationFormCNTs;

