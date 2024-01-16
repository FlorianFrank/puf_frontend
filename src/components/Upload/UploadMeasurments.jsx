import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@mui/material/Input';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { BACKEND_BASE_URL } from '../../config'

const UploadMeasurments = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('uploaded_csv_files', file);
    });
    fetch(`${BACKEND_BASE_URL}/uploadMeasurmentsApi/uploadMeas/`, {
      method: 'POST',
      body: formData,
      headers: { 'X-CSRFToken': '{{ csrf_token }}' } // replace with actual CSRF token value
    })
      .then((response) => {
        // Handle response
        console.log(
          '🚀 ~ file: UploadMeasurments.jsx:29 ~ handleSubmit ~ response:',
          response
        );
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Button
          startIcon={<UploadFileIcon />}
          variant="contained"
          component="label"
        >
          Upload
          <input
            hidden
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileChange}
          />
        </Button>
        <br />
        <br />
        {files.length > 0 && (
          <div>
            <p>Selected Files:</p>
            <ul>
              {files.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
        <br />
        <br />
      </form>
    </div>
  );
};

export default UploadMeasurments;
