import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import 'react-toastify/dist/ReactToastify.css';

import {
    Navbar,
    Sidebar,
    Devices,
    EvaluationStepper,
    Results,
    Upload,
    EvaluationsPage,
    RawEvaluation,
} from '../components';

import {TestsPage, Overview} from './index';

import {useStateContext} from '../contexts/ContextProvider';
import TestCategorySelector from '../components/Tests/AddTest/TestCategorySelector';
import ScriptExecution from '../components/Tests/AddTest/ScriptExecution';
import AddCNTTest from '../components/Tests/AddTest/AddCNTTest';
import AddMemoryTest from '../components/Tests/AddTest/AddMemoryTest';
import TestsStateView from '../components/Tests/TestsStateView';
import VersionInfo from '../components/Utils/VersionInfo';

const Home = () => {

    const {activeMenu} = useStateContext();

    return (
        <div className="flex relative dark:bg-main-dark-bg">
            {/** Setting Button */}
            <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                <TooltipComponent content="Settings" position="Top">
                    <button
                        type="button"
                        style={{background: 'blue', borderRadius: '50%'}}
                        className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <FiSettings/>
                    </button>
                </TooltipComponent>
            </div>

            {/* sidebar*/}
            {activeMenu ? (
                <div className="w-72 fixed sidebare dark:bg-secondary-dark-bg bg-white">
                    <Sidebar/>
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg ">
                    <Sidebar/>
                </div>
            )}

            {/** Navbare */}
            <div
                className={` dark:bg-main-bg bg-main-bg min-h-screen w-full
            ${activeMenu ? 'md:ml-72' : 'flex-2'}
            `}
            >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar/>
                </div>
                {/** Routing */}
                <div>
                    <Routes>
                        <Route path="/" element={<Devices/>}/>
                        <Route path="/overview" element={<Overview/>}/>
                        <Route path="/devices" element={<Devices/>}/>
                        <Route path="/addTest" element={<TestCategorySelector/>}/>
                        <Route path="/addMemoryTest" element={<AddMemoryTest/>}/>
                        <Route path="/addScriptTest" element={<ScriptExecution/>}/>
                        <Route path="/addCNTTest" element={<AddCNTTest/>}/>
                        <Route path="/versionInfo" element={<VersionInfo/>}/>
                        {/**TESTS */}
                        <Route path="/tests" element={<TestsPage/>}/>
                        <Route
                            path="/waitingTests"
                            element={<TestsStateView test_state='waiting'/>}
                        />
                        <Route
                            path="/runningTests"
                            element={<TestsStateView test_state='running'/>}
                        />
                        <Route
                            path="/completedTests"
                            element={<TestsStateView test_state='finished'/>}
                        />


                        {/**EVALUATION   */}
                        <Route
                            path="/evaluation/memory"
                            element={<EvaluationStepper evalType={'memory'}/>}
                        />
                        <Route
                            path="/evaluation/cnt_fets"
                            element={<EvaluationStepper evalType={'cnt_puf'}/>}
                        />
                        <Route
                            path="/evaluation"
                            element={<EvaluationsPage/>}
                        />

                        <Route path="/metrics" element={<RawEvaluation/>}/>
                        <Route path="/uploadMeasurments" element={<Upload/>}/>
                        <Route path="/results" element={<Results/>}/>
                    </Routes>
                </div>
                {/*End Routing */}
            </div>
            {/* End Navbare */}
        </div>
    );
};

//<Route path="/AddMemoryTest" element={<AddMemoryTest user={user} />} />

export default Home;
