import React from 'react';
import {Header} from "../index";


import Typography from "@mui/material/Typography";
import {useLocation} from "react-router-dom";
import microcontroller_raspberry_pi_3 from '../../assets/devices/microcontroller_raspberry_pi_3.png';
import nanosec_matrix from '../../assets/devices/nanosec_matrix.jpg';

const TestDetail = () => {
        let location = useLocation();
        const testTitle = location.state?.testTitle || '';
        const testDetails = location.state?.testDetails || [];
        const testCategory = location.state?.testCategory || '';

        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Evaluation" title='Test Detail'/>
                <div>
                    <div style={{float: 'left', paddingTop: '3.5%', paddingRight: '5%'}}>
                        <img src={(testCategory === 'cntpuf') ? nanosec_matrix : microcontroller_raspberry_pi_3} style={{maxHeight: '600px', maxWidth: '400px'}} alt="logo"/>
                    </div>
                    <div style={{flex: '1', background: 'white'}}>
                        <table>
                            <Typography variant="h6" color="text.secondary">
                                <tr>
                                    <th colSpan={2} style={{textAlign: "left"}}>
                                        <Typography variant="h4" color="text.secondary">{testTitle}</Typography>
                                    </th>
                                </tr>
                                <br/>
                                {testDetails.map((entry) => {
                                    return <tr>
                                        <th style={{
                                            border: '1px solid black',
                                            paddingRight: '20px',
                                            width: '200px',
                                            textAlign: 'left'
                                        }}>{entry['key']}</th>

                                        <td style={{
                                            border: '1px solid black',
                                            width: '200px',
                                            textAlign: 'left'
                                        }}>
                                            {entry['value']}
                                        </td>
                                    </tr>
                                })}

                            </Typography>
                        </table>
                    </div>
                </div>
            </div>
        )
            ;
    }
;

export default TestDetail;