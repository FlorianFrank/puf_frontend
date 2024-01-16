import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

const MemoryComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const groups = [
    {
      label: 'Group 1',
      nestedTabs: [
        { label: 'Nested Tab 1', content: 'Nested Tab 1 Content' },
        { label: 'Nested Tab 2', content: 'Nested Tab 2 Content' },
        { label: 'Nested Tab 3', content: 'Nested Tab 3 Content' }
      ]
    },
    { label: 'Group 2', content: 'Group 2 Content' },
    { label: 'Group 3', content: 'Group 3 Content' },
    { label: 'Group 4', content: 'Group 4 Content' }
  ];

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered>
        {groups.map((group, index) => (
          <Tab key={index} label={group.label} />
        ))}
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        {groups.map((group, index) => (
          <TabPanel key={index} value={value} index={index}>
            <h2>{group.label} Content</h2>
            {Array.isArray(group.nestedTabs) ? (
              <Tabs value={value} onChange={handleChange} centered>
                {group.nestedTabs.map((nestedTab, nestedIndex) => (
                  <Tab key={nestedIndex} label={nestedTab.label} />
                ))}
              </Tabs>
            ) : null}
            <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
              {Array.isArray(group.nestedTabs)
                ? group.nestedTabs.map((nestedTab, nestedIndex) => (
                    <TabPanel
                      key={nestedIndex}
                      value={value}
                      index={nestedIndex}
                    >
                      <h3>{nestedTab.content}</h3>
                      {/* Add your content for nested tabs */}
                    </TabPanel>
                  ))
                : null}
            </SwipeableViews>
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default MemoryComponent;
