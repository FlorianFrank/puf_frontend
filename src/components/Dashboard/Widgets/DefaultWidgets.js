import ServerInfoTable from "./ServerInfoTable";
import React from 'react';
import DashboardWidget from "./DashboardWidget";
import ServerPerformance from "./ServerPerformance";
import DeviceTable from "../../Devices/DeviceTable";
import Table from "./TableComponent";
import mock from "../components/mock";
import LoggingComponent from "./LoggingComponent";


export function ServerInfoWidget(handleDelete, classes) {
    return <DashboardWidget style={{height: '200px'}}
                            title="Server Info"
                            upperTitle
                            bodyClass={classes.fullHeightBody}
                            className={classes.card}
                            onDeleteHandler={() => {
                                handleDelete()
                            }}>
        <ServerInfoTable/>
    </DashboardWidget>
}

export function ServerPerformanceWidget(handleDelete, classes) {
    return <DashboardWidget
        style={{height: '220px'}}
        title="Server Performance Info"
        upperTitle
        className={classes.card}
        bodyClass={classes.fullHeightBody}
        onDeleteHandler={() => {
            handleDelete()
        }}
    >
        <ServerPerformance/>
    </DashboardWidget>
}

export function DevicesWidget(handleDelete, classes) {
    return <DashboardWidget
        title="Available Devices"
        upperTitle
        noBodyPadding
        bodyClass={classes.tableWidget}
        onDeleteHandler={() => {
            handleDelete()
        }}>
        <DeviceTable/>
    </DashboardWidget>
}

export function TestExecutionTableWidget(handleDelete, classes) {
    return <DashboardWidget
        title="Test Execution Status"
        upperTitle
        noBodyPadding
        bodyClass={classes.tableWidget}
        onDeleteHandler={() => {
            handleDelete()
        }}
    >
        <Table data={mock.table}/>
    </DashboardWidget>
}

export function LoggingWidget(handleDelete, classes) {
    return <DashboardWidget
        title="Logging"
        upperTitle
        noBodyPadding
        bodyClass={classes.tableWidget}
        onDeleteHandler={() => {
            handleDelete()
        }}
    >
        <LoggingComponent/>
    </DashboardWidget>
}