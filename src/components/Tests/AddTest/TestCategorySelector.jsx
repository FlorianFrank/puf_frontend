import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {testExecutionTypes} from '../../../data/navbar_config';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Header from "../../Header";
import {testClasses} from "../../../data/tests_config";

const TestCategorySelector = () => {
    const navigate = useNavigate();
    const [testType, setTestType] = useState('')

    const navigateToNextPage = (testType) => {
        navigate(testClasses[testType] || '/defaultRoute');
    };

    return (
        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            <Header category="Tests" title="Select Test Type"/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-1 flex-col gap-3 lg:pl-3 mt-2 w-full">
                    <select
                        id="underline_select"
                        className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                        value={testType}
                        onChange={(event) => {
                            setTestType(event.target.value)
                        }}
                    >
                        <option>Select a test execution type</option>
                        {testExecutionTypes.map((testType) => (
                            <option key={testType.name} value={testType.name}>
                                {testType.name}
                            </option>
                        ))}
                    </select>

                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <button
                            type="submit"
                            className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
                            onClick={() => {
                                navigateToNextPage(testType)
                            }}
                        >
                            Next
                        </button>
                    </Box>
                </div>
            </div>
        </div>
    );
};

TestCategorySelector.propTypes = {
    user: PropTypes.object, // Update the prop type based on the actual structure
};

export default TestCategorySelector;
