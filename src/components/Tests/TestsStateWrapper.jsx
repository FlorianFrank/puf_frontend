import React from 'react';
import TestsStateView from "./TestsStateView";
import Stack from '@mui/material/Stack';
import {Header} from "../index";


const TestsStateWrapper = () => {
    return (
        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            <Header category="Tests" title={
                'Tests Status'
            }/>
            <TestsStateView test_state='waiting' headerBgColor={"#0088c9"}/>
            <TestsStateView test_state='running' headerBgColor={"#58508d"}/>
            <TestsStateView test_state='finished' headerBgColor={"#9bb2e0"}/>
        </div>
    )
}

export default TestsStateWrapper;
