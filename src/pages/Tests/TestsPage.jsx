import React from 'react';
import {Route, Routes} from 'react-router-dom';

import {
    Tests,
    AddTest,
    TestDetail
} from '../../components';

const TestsPage = () => {
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl">
            <div className="h-full">
                <Routes>
                    <Route path="/" exact element={<Tests/>}/>
                    <Route path="/create-test" element={<AddTest/>}/>
                    <Route
                        path="/testDetail"
                        element={<TestDetail/>}
                    />
                </Routes>
            </div>
        </div>
    );
};

export default TestsPage;
