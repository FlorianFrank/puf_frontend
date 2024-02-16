import ServerInfoTable from "./ServerInfoTable";
import React from 'react';
import DashboardWidget from "./DashboardWidget";
import ServerPerformance from "./ServerPerformance";
import DeviceTable from "../../Devices/DeviceTable";
import Table from "./TableComponent";
import LoggingComponent from "./LoggingComponent";
import LivePlotComponent from "./LivePlotComponent";


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
        <Table data={[
            {
                id: 0,
                title: "Sample",
                type: "Transfer Characteristic",
                device: "Keithley 2600",
                iteration: 20,
                status: "finished"
            },
            {
                id: 0,
                title: "Sample2",
                type: "Output Characteristic",
                device: "NanoSEC Testcontainer",
                iteration: 20,
                status: "finished"
            },
            {
                id: 0,
                title: "Sample",
                type: "Transfer Characteristic",
                device: "Keithley 2600",
                iteration: 20,
                status: "finished"
            }
        ]}/>
    </DashboardWidget>
}

export function LoggingWidget(handleDelete, classes) {
    return <DashboardWidget
        title="Logging"
        upperTitle
        noBodyPadding
        bodyClass={classes.fullHeightBody}
        className={classes.card}
        onDeleteHandler={() => {
            handleDelete()
        }}
    >
        <LoggingComponent/>
    </DashboardWidget>
}

export function LivePlotWidget(handleDelete, classes) {
    return <DashboardWidget
        title="Live Plot"
        upperTitle
        noBodyPadding
        bodyClass={classes.fullHeightBody}
        className={classes.card}
        onDeleteHandler={() => {
            handleDelete()
        }}
    >
        <LivePlotComponent/>
    </DashboardWidget>
}


