import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
//
import { InterHammeingDistancetable } from '../index';

export default function Uniqueness(props) {
  const { data } = props;
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabSwipe = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        <div className="border-solid border-2 shadow-inner-xl rounded-r-lg border-sky-500">
          <Typography
            sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}
          >
            Select Test Type
          </Typography>
          {data.map((group, j) => (
            <Chip
              key={j}
              label={group.testType}
              onClick={(event) => handleTabChange(event, j)}
              color={activeTab === j ? 'primary' : 'default'}
              sx={{ m: 1 }}
            />
          ))}
        </div>
      </Box>
      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleTabSwipe}
        enableMouseEvents
        sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '100px' }}
      >
        {data.map((group, index) =>
          group.length === 0 ? (
            <p>error</p>
          ) : (
            <NestedMemoryTablePanel key={index} group={group} />
          )
        )}
      </SwipeableViews>
    </>
  );
}

const NestedMemoryTablePanel = ({ group }) => {
  console.log(group);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabSwipe = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        <div className="border-solid border-2 shadow-inner-xl rounded-r-lg border-sky-500">
          <Typography
            sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}
          >
            Select Memory Type
          </Typography>
          {group.memories.length === 0 ? (
            <NotEnoughDataAlert />
          ) : (
            group.memories.map((memory, index) => (
              <Chip
                key={index}
                label={memory.memoryKey}
                onClick={(event) => handleTabChange(event, index)}
                color={activeTab === index ? 'primary' : 'default'}
                sx={{ m: 1 }}
              />
            ))
          )}
        </div>
      </Box>
      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleTabSwipe}
        enableMouseEvents
      >
        {group.memories.map((memory, index) => (
          <NestedInitValueTablePanel key={index} group={memory} />
        ))}
      </SwipeableViews>
    </>
  );
};

const NestedInitValueTablePanel = ({ group }) => {
  console.log(group);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabSwipe = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        <div className="border-solid border-2 shadow-inner-xl rounded-r-lg border-sky-500">
          <Typography
            sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}
          >
            Select Initial Value
          </Typography>

          {group.initialValueKey.length === 0 ? (
            <NotEnoughDataAlert />
          ) : (
            group.initialValueKey.map((initValue, index) => (
              <Chip
                key={index}
                label={initValue.initialValue}
                onClick={(event) => handleTabChange(event, index)}
                color={activeTab === index ? 'primary' : 'default'}
                sx={{ m: 1 }}
              />
            ))
          )}
        </div>
      </Box>
      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleTabSwipe}
        enableMouseEvents
      >
        {group.initialValueKey.map((initiaValueGroup, index) => (
          <NestedStartStopAddressTablePanel
            key={index}
            group={initiaValueGroup}
          />
        ))}
      </SwipeableViews>
    </>
  );
};

const NestedStartStopAddressTablePanel = ({ group }) => {
  console.log(group);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabSwipe = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        <div className="border-solid border-2 shadow-inner-xl rounded-r-lg border-sky-500">
          <Typography
            sx={{ display: 'flex', flexWrap: 'wrap', margin: '10px' }}
          >
            Select Memory Area
          </Typography>
          {group.startStopAddresses.length === 0 ? (
            <NotEnoughDataAlert />
          ) : (
            group.startStopAddresses.map((startStopAddr, index) => (
              <Chip
                key={index}
                label={`${startStopAddr.startAddress} - ${startStopAddr.stopAddress}  `}
                onClick={(event) => handleTabChange(event, index)}
                color={activeTab === index ? 'primary' : 'default'}
                sx={{ m: 1 }}
              />
            ))
          )}
        </div>
      </Box>
      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleTabSwipe}
        enableMouseEvents
      >
        {group.startStopAddresses.map((group, i) => (
          <NestedChallengeTablePanel key={i} group={group} />
        ))}
      </SwipeableViews>
    </>
  );
};

const NestedChallengeTablePanel = ({ group }) => {
  console.log(group);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabSwipe = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        <div className="border- border-2 rounded-lg border-sky-500">
          <Typography
            sx={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}
          >
            Select Challenge (Data Setup Time)
          </Typography>

          {group.challenges.length === 0 ? (
            <NotEnoughDataAlert />
          ) : (
            group.challenges.map((challengeGroup, index) => (
              <Chip
                key={index}
                value={index}
                label={challengeGroup.challenge}
                onClick={(event) => handleTabChange(event, index)}
                color={activeTab === index ? 'primary' : 'default'}
                sx={{ m: 1 }}
              />
            ))
          )}
        </div>
      </Box>

      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleTabSwipe}
        enableMouseEvents
      >
        {group.challenges.map((challengeGroup, i) =>
          challengeGroup.inter_hamming_distances.length === 0 ? (
            <NotEnoughDataAlert />
          ) : (
            <InterHammeingDistancetable key={i} group={challengeGroup} />
          )
        )}
      </SwipeableViews>
    </>
  );
};

const NotEnoughDataAlert = () => {
  return (
    <>
      <Alert severity="warning">
        <AlertTitle>Not enough data:</AlertTitle>
        Try selecting measurements with the same memory model same challenge but
        diffrent - <strong>Memory Label</strong> -
      </Alert>
    </>
  );
};
