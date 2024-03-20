import React, {useEffect, useState} from 'react';
import {Route, useNavigate} from 'react-router-dom';
import {Header} from '../index';

import Box from "@mui/material/Box";
import * as PropTypes from "prop-types";
import Router from "../../routes";
import {FETCH_TEST_CATEGORIES} from "../../config";
import {Alert} from "@mui/lab";
import LoadingClip from "../Utils/LoadingClip";
import {fetch_get} from "../Utils/AuthenticationUtils";


function Routes() {
    return null;
}

Routes.propTypes = {children: PropTypes.node};
const EvaluationsPage = () => {
    const [testExecutionTypes, setTestExecutionTypes] = useState([])
    const [loading, setIsLoading] = useState(true)

    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fetchTestCategories = async () => {

        await fetch_get(FETCH_TEST_CATEGORIES, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                setTestExecutionTypes(retData.categories)
                setIsLoading(false)
            }
        })
    }

    useEffect(() => {
        fetchTestCategories().catch((errorMessage) => {
            console.log('Error while calling fetchTestCategories', errorMessage)
        })

    }, [])

    const navigate = useNavigate();


    const [values, setValues] = useState({
        title: '',
        initialValue: '0x55',
        testType: '',
        startAddress: 0,
        stopAddress: 99,
        temperature: 23,
        temperatureChecked: false,
        multipleIteratonsChecked: false,
        voltageChecked: false,
        voltage: 12,
        dataSetupTime: '15',
        iterations: 1
    });

    const handleChange = (name) => (event) => {
        setValues({...values, [name]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)
    if (loading)
        return (<LoadingClip/>);

    return (
        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            <Router>
                <Route path="/addMemoryTest" element={<div>T$S</div>}/>
            </Router>
            <Header category="Evaluation" title="Select test type to evaluate"/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-1 flex-col gap-3 lg:pl-3 mt-2 w-full">
                    <form onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-6 group">
                            <select
                                id="underline_select"
                                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                                value={values.testType}
                                onChange={handleChange('testType')}
                            >
                                <option selected>Select a test execution type</option>
                                {testExecutionTypes.map((testType) => (
                                    <option key={testType.name} value={testType.name}>
                                        {testType.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                            <button

                                type="submit"
                                className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
                                // TODO make dynamic
                                onClick={() => {
                                    if (values.testType === 'Memory Tests')
                                        navigate('/evaluation/memory');
                                    else if (values.testType === 'Script Test')
                                        navigate('/evaluation/cnt_fets');
                                    else if (values.testType === 'Visual Programming Test')
                                        navigate('/addGraphicalTest');
                                    else if (values.testType === 'Carbon Nanotube Tests')
                                        navigate('/evaluation/cnt_fets');
                                    else if (values.testType === 'Memristor Test')
                                        navigate('/evaluate');
                                }}
                            >
                                Next
                            </button>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EvaluationsPage;
