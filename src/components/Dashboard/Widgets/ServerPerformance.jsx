import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import {Alert} from "@mui/lab";
import LoadingClip from "../../Utils/LoadingClip";
import {fetch_get} from "../../Utils/AuthenticationUtils";
import {FETCH_SERVER_PERFORMANCE} from "../../../config";
import useStyles from "../components/style";
import {useTheme} from "@material-ui/core/styles";

const ServerPerformance = () => {

    var classes = useStyles();
    var theme = useTheme();


    const [performanceData, setPerformanceData] = useState({});

    const [loading, setLoading] = useState(true);
    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const fetchDevicePerformance = async () => {
        await fetch_get(FETCH_SERVER_PERFORMANCE, (value) => {
            setAlertIsSet(value)
        }, (value) => {
            setAlertMessage(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                setPerformanceData(retData);
                setLoading(false)
            }
        })
    };


    useEffect(() => {
        fetchDevicePerformance().catch((error) => {
            console.log('fetchDevices caused an exception', error)
        })
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    if (alertIsSet)
        return (<div><Alert severity="error">{alertMessage}</Alert></div>)
    if (loading)
        return (<LoadingClip/>);


    return (<React.Fragment>
        <div className={classes.serverOverviewElement}
        >
            <Typography
                style={{marginLeft: '10px'}}
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
            >
                CPU ({performanceData['current_cpu_load']} %):
            </Typography>
            <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={56} width="99%">
                    <AreaChart data={performanceData['list_cpu_load']}>
                        <Area
                            type="natural"
                            dataKey="value"
                            stroke={theme.palette.secondary.main}
                            fill={theme.palette.secondary.light}
                            strokeWidth={2}
                            fillOpacity="0.25"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className={classes.serverOverviewElement}>
            <Typography
                style={{marginLeft: '10px'}}
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
            >
                Memory ({performanceData['current_memory_consumption']} %):
            </Typography>
            <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={56} width="99%">
                    <AreaChart data={performanceData['list_memory_consumption']}>
                        <Area
                            type="natural"
                            dataKey="value"
                            stroke={theme.palette.primary.main}
                            fill={theme.palette.primary.light}
                            strokeWidth={2}
                            fillOpacity="0.25"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className={classes.serverOverviewElement}>
            <Typography
                style={{marginLeft: '10px'}}
                color="text"
                colorBrightness="secondary"
                className={classes.serverOverviewElementText}
                noWrap
            >
                Network ({performanceData['current_network_usage']}):
            </Typography>
            <div className={classes.serverOverviewElementChartWrapper}>
                <ResponsiveContainer height={56} width="99%">
                    <AreaChart data={performanceData['list_network_usage']}>
                        <Area
                            style={{width: '50%'}}
                            type="natural"
                            dataKey="value"
                            stroke={theme.palette.warning.main}
                            fill={theme.palette.warning.light}
                            strokeWidth={2}
                            fillOpacity="0.25"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </React.Fragment>)

}

export default ServerPerformance;
