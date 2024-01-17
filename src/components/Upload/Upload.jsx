import React from 'react';

import { UploadStepper } from '../index';
import { Header } from '../index';

const Upload = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Import" title="Upload MeasurementSelector" />
      <UploadStepper />
    </div>
  );
};

export default Upload;
