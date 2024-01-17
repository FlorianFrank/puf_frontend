import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Login} from './components';
import {Home} from './pages';
import {FetchDevicesBgService} from "./components/Devices/FetchDevicesBgService";
import './App.css';


function App() {

    FetchDevicesBgService()

    return (
        <React.Fragment>
            <div className="App">
                <ToastContainer position="top-right"/>
            </div>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/*" element={<Home/>}/>
                </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;
