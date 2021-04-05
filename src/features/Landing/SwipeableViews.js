import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Posts from '../Post/Posts';
import { VENUES, JOBS, EVENTS } from '../../constants/routes';
import { useTheme } from '@material-ui/core/styles';
import { tabIndex } from '../../constants/globalVars';
import { useReactiveVar } from '@apollo/client';
import { Box } from '@material-ui/core';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Swipeableviews = ({ history, session }) => {
  const reactiveTabIndex = useReactiveVar(tabIndex);
  const theme = useTheme();

  const handleTabChange = (index) => {
    if (index === reactiveTabIndex) return;
    if (index === 0) {
      history.push(EVENTS);
    }
    if (index === 1) {
      history.push(VENUES);
    }

    if (index === 2) {
      history.push(JOBS);
    }
  };

  return (
    <SwipeableViews
      resistance
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={reactiveTabIndex}
      onChangeIndex={handleTabChange}
      containerStyle={{
        // Fixes blurry text issue on Chrome, needs improving
        // as blur still renders briefly before unset
        willChange: 'unset',
      }}
    >
      <TabPanel
        value={reactiveTabIndex}
        index={0}
        dir={theme.direction}
      >
        <Posts session={session} limit={20} history={history} />
      </TabPanel>
      <TabPanel
        value={reactiveTabIndex}
        index={1}
        dir={theme.direction}
      >
        <Posts session={session} limit={20} history={history} />
      </TabPanel>
      <TabPanel
        value={reactiveTabIndex}
        index={2}
        dir={theme.direction}
      >
        <Posts session={session} limit={20} history={history} />
      </TabPanel>
    </SwipeableViews>
  );
};

export default Swipeableviews;
