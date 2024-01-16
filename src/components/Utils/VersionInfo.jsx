import React from 'react';
import logo from "../../assets/up_logo.png";
import Typography from "@mui/material/Typography";

const VersionInfo = () => {

    return (<header className="App-header">
            <div style={{margin: 'auto', width: '50%', paddingTop: '5%'}}>
                <div className="p-5" style={{margin: 'auto', width: '80%'}}>
                    <img src={logo} width="400px" alt="logo"/>
                    <Typography variant="h5" color="text.secondary">
                        PUF Execution & Evaluation Platform
                    </Typography>
                </div>

                <table>

                    <tr>
                        <td style={{columnSpan: 2}}>
                            <Typography variant="h4" color="text.secondary">
                                Version Info
                            </Typography>
                        </td>
                    </tr>
                    <Typography variant="h6" color="text.secondary">
                        <tr>
                            <td>
                                Version:
                            </td>
                            <td>
                                1.0.0
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Copyright:
                            </td>
                            <td>
                                University of Passau - Chair of Computer Engineering
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style={{paddingRight: '20px'}}>Developers:</div>

                            </td>
                            <td>
                                Florian Frank (<a
                                href="mailto:Florian.Frank@uni-passau.de">Florian.Frank@uni-passau.de</a>)
                            </td>
                        </tr>

                        <tr>
                            <td/>
                            <td>
                                Abderrazzak El Khayari
                            </td>
                        </tr>
                        <tr>
                            <td/>
                            <td>
                                Alexander Braml (<a
                                href="mailto:braml@fim.uni-passau.de">braml@fim.uni-passau.de</a>)
                            </td>
                        </tr>
                    </Typography>

                </table>
            </div>
        </header>
    )
};

export default VersionInfo;