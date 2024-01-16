import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Uniformity from './Uniformity';
import Robustness from './Robustness';
import Uniqueness from './Uniqueness';
import {Header} from "../../../index";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

export default function Metrics() {
  let location = useLocation();
  const evaluationData = {} // location.state?.evaluationData || {};
  const evaluationResult = {} // JSON.parse(location.state?.evaluationResult || {});

  const uniformityData = evaluationResult?.uniformity || [];
  console.log(
    '🚀 ~ file: Metrics.jsx:58 ~ Metrics ~ uniformityData:',
    uniformityData
  );
  const robustnessData = evaluationResult?.intra_hd_list || [];
  console.log(
    '🚀 ~ file: Metrics.jsx:60 ~ Metrics ~ robustnessData:',
    robustnessData
  );
  const uniquenessData = evaluationResult?.inter_hd_list || [];
  console.log(
    '🚀 ~ file: Metrics.jsx:62 ~ Metrics ~ uniquenessData:',
    uniquenessData
  );

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const selected =
    JSON.parse(localStorage.getItem('selectedMeasurements')) || [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  /*useEffect(() => {
    requestMetrics();
  }, []);*/

  /*
  let requestMetrics = async () => {
    setLoading(true);
    const allData = {
      name: 'from metrics 01',
      measurments: selected,
      uniformityChallenges: state.uniformityChallenges,
      uniquenessChallenges: state.uniformityChallenges,
      robustnessChallenges: state.robustnessChallenges
    };

    fetch('http://127.0.0.1:8000/api/getMetrics/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(allData)
    })
      .then((response) => response.json())
      .then((data) => {
        setMetrics(data);
        console.log('metrics', data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) {
    return <p>Loading data...</p>;
  }*/

  return (
    <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
      <Header category="Evaluation" title="Results / Metrics" />
      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
        <Divider />
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Uniformity" {...a11yProps(0)} />
            <Tab label="Robustness" {...a11yProps(1)} />
            <Tab label="Uniqueness" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Uniformity
              evaluation_id={evaluationData.id}
              data={uniformityData}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Robustness
              evaluation_id={evaluationData.id}
              data={robustnessData}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Uniqueness
              evaluation_id={evaluationData.id}
              data={uniquenessData}
            />
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
