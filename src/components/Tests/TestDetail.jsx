import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import {BACKEND_IP_ADDRESS, BACKEND_BASE_URL} from '../../config'
import {Alert} from "@mui/lab";


const TestDetail = () => {
  const navigate = useNavigate();
  const { testId } = useParams();
  console.log(testId);
  const [test, setTest] = useState();
  const [response, setResponse] = useState(null);
  const [alertState, setAlertState] = useState(null)

  const [loading, setLoading] = useState(true);
  const [alertIsSet, setAlertIsSet] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // TODO not implemented by the backend
  const requestTestById = async (id) => {
    const fetchStr = 'http://'+BACKEND_IP_ADDRESS+':8000/api/tests/'+testId
    try{
      let response = await fetch(fetchStr);
      let data = await response.json();
      console.log('DATA:', data);
      setTest(data);
    }catch (error){
      setAlertState(<Alert severity="warning">{'Could not fetch from '+fetchStr+' ('+error+')'}</Alert>)
    }
  };

  useEffect(() => {
    requestTestById();
  }, [testId]);

  const startTest = async (id) => {
    const fetchStr = 'http://'+BACKEND_IP_ADDRESS+':8088/startTest'
    try {
      const data = test;
      const res = await fetch(fetchStr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      setResponse(json);
      console.log(response);
      navigate('/tests/running');
    } catch (error) {
      setAlertState(<Alert severity="warning">{'Could not fetch from '+fetchStr+' ('+error+')'}</Alert>)
    }
  };

  if (alertIsSet)
    return (<div><Alert severity="error">{alertMessage}</Alert></div>)

  if (test) {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" color="text.secondary">
              {test.title ? test.title : '...'}
            </Typography>
            <Typography variant="h5" component="div">
              {test.type ? test.type : '...'} - {test.board}
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              * Initial value: {test.initialValue}
            </Typography>
            <Typography variant="body2">
              * Start and stop addresses: {test.startAddress} -{' '}
              {test.stopAddress}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              * Voltage: {test.voltage}
            </Typography>
            <Typography variant="body2">
              * Temperature: {test.temperature}
              <br />
            </Typography>
            <Typography variant="body2">
              * Data setup time: {test.dataSetupTime}
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                startTest(test.id);
              }}
            >
              Start
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  } else {
    return null;
  }
};

export default TestDetail;
