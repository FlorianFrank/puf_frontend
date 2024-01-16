import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MemoryComponent } from '../index';

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

export default function TestTypeComponent(props) {
  const { testData } = props;
  console.log(testData);

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <MemoryComponent />
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {testData.map((testTypedata, index) => {
            console.log(testTypedata);

            return (
              <Tab
                key={index}
                label={testTypedata.testType}
                {...a11yProps(0)}
              />
            );
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {testData.map((testTypedata, index) => {
          console.log(testTypedata);

          return (
            <TabPanel value={value} index={index} dir={theme.direction}>
              <Tabs value={value} onChange={handleChange} centered>
                {testTypedata.memories.map((memoriesGroup, memoriesIndex) => {
                  console.log(
                    '🚀 ~ file: TestTypeComponent.jsx:98 ~ {testTypedata.memories.map ~ memoriesGroup:',
                    memoriesGroup
                  );

                  return (
                    <Tab key={memoriesIndex} label={memoriesGroup.memoryKey} />
                  );
                })}
              </Tabs>
              <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
                {Array.isArray(testTypedata.memories)
                  ? testTypedata.memories.map((nestedTab, nestedIndex) => (
                      <TabPanel
                        key={nestedIndex}
                        value={value}
                        index={nestedIndex}
                      >
                        <h3>hello</h3>
                        {/* Add your content for nested tabs */}
                      </TabPanel>
                    ))
                  : null}
              </SwipeableViews>
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </>
  );
}
