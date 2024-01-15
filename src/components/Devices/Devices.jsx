import React, {useState, useEffect} from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Resize,
    Sort,
    ContextMenu,
    Filter,
    Page,
    ExcelExport,
    PdfExport,
    Inject
} from '@syncfusion/ej2-react-grids';
import {Alert} from '@mui/lab';
import {Device, Header} from '..';
import {contextMenuItems} from '../../data/navbar_config';
import {FETCH_DEVICES_LIST} from '../../config';
import {useStateContext} from '../../contexts/ContextProvider';
import {fetch_get} from '../Utils/AuthenticationUtils';
import LoadingClip from '../Utils/LoadingClip';

const Devices = () => {
        const {setDevices} = useStateContext();
        const [data, setData] = useState([]);

        const [loading, setLoading] = useState(true);
        const [alertIsSet, setAlertIsSet] = useState(false);
        const [alertMessage, setAlertMessage] = useState('');

        const fetchDevices = async () => {
            await fetch_get(FETCH_DEVICES_LIST, (value) => {
                setAlertIsSet(value)
            }, (value) => {
                setAlertMessage(value)
            }).then((retData) => {
                console.log(retData)
                if (retData) {
                    setData(retData);
                    setDevices(retData);
                    setLoading(false)
                }
            })
        };

    useEffect(() => {
        fetchDevices().catch((error) => {
            console.log('fetchDevices caused an exception', error)
        })
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

        if (alertIsSet)
            return (<div><Alert severity="error">{alertMessage}</Alert></div>)
        if (loading)
            return (<LoadingClip/>);

        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Dashboard" title="Devices"/>

                <GridComponent
                    id="gridcomp"
                    dataSource={data}
                    rowTemplate={Device}
                    allowPaging
                    allowSorting
                    allowExcelExport
                    allowPdfExport
                    contextMenuItems={contextMenuItems}
                >
                    <ColumnsDirective>
                        <ColumnDirective headerText="Device Id" width="90" textAlign="Center" field="ID"/>
                        <ColumnDirective headerText="Name" width="120" textAlign="Center" field="Name"/>
                        <ColumnDirective headerText="Type" width="120" textAlign="Center" field="Type"/>
                        <ColumnDirective headerText="Protocol" width="120" textAlign="Center" field="Protocol"/>
                        <ColumnDirective headerText="Port" width="120" textAlign="Center" field="Port"/>
                        <ColumnDirective headerText="Status" width="120" textAlign="Center" field="Status"/>
                        <ColumnDirective headerText="Test" width="120" textAlign="Center" field="Test"/>
                        <ColumnDirective
                            headerText="More Information"
                            width="120"
                            textAlign="Center"
                            field="Additional"
                        />
                    </ColumnsDirective>
                    <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport]}/>
                </GridComponent>
            </div>
        );
    }
;

export default Devices;