import React, { useState, useEffect } from 'react';
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
import ClipLoader from 'react-spinners/ClipLoader';

import { Device } from '..';

import { contextMenuItems } from '../../data/dummy';

import { BACKEND_IP_ADDRESS } from '../../config';
import { useStateContext } from '../../contexts/ContextProvider';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'blue'
};

const DeviceImage = (props) => (
    <div>
      <img className="rounded-xl h-20 md:ml-3" src={props.ProductImage} alt="Err" />
    </div>
);

const DeviceStatus = (props) => (
    <button
        type="button"
        style={{ background: props.StatusBg }}
        className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.Status}
    </button>
);

const Devices = () => {
  const { devices, setDevices } = useStateContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const fetchStr = `http://${BACKEND_IP_ADDRESS}:8000/device_manager/get_devices/`;
      const res = await fetch(fetchStr);
      const json = await res.json();

      setData(json);
      setDevices(json);
      setLoading(false);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  const startTest = () => {
    console.log('Start test');
    // Additional logic for starting tests
  };

  useEffect(() => {
    fetchDevices();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
        <div className="sweet-loading">
          <ClipLoader
              color="#ffff00"
              loading={true}
              size={150}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
          />
        </div>
    );
  }

  return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        {/* Additional alertState logic */}
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <ColumnDirective headerText="Device Id" width="90" textAlign="Center" field="ID" />
            <ColumnDirective headerText="Name" width="120" textAlign="Center" field="Name" />
            <ColumnDirective headerText="Type" width="120" textAlign="Center" field="Type" />
            <ColumnDirective headerText="Protocol" width="120" textAlign="Center" field="Protocol" />
            <ColumnDirective headerText="Port" width="120" textAlign="Center" field="Port" />
            <ColumnDirective headerText="Status" width="120" textAlign="Center" field="Status" />
            <ColumnDirective headerText="Test" width="120" textAlign="Center" field="Test" />
            <ColumnDirective
                headerText="More Information"
                width="120"
                textAlign="Center"
                field="Additional"
            />
          </ColumnsDirective>
          <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport]} />
        </GridComponent>
      </div>
  );
};

export default Devices;