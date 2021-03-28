import React from 'react';
import { Tooltip, Tabs, Tab } from '@material-ui/core';
import { VENUES, JOBS, EVENTS } from '../../constants/routes';
import history from '../../constants/history';
import { contentDrawer, tabIndex } from '../../constants/globalVars';
import { scrollTop } from '../Shared/ScrollTop';
import {
  WorkOutlineOutlined,
  HomeWorkOutlined,
  EventOutlined,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const handleTabChange = (e, index) => {
  if (tabIndex() === index) return;

  if (index === 0) {
    history.push(VENUES);
  }

  if (index === 1) {
    history.push(EVENTS);
  }

  if (index === 2) {
    history.push(JOBS);
  }
};

const AppBarTabs = React.memo(
  ({}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    return (
      <Tabs
        value={tabIndex()}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="off"
      >
        <Tooltip title={matches ? 'Venues' : ''}>
          <Tab
            onClick={(e) => {
              e.stopPropagation();

              if (history.location.pathname !== VENUES)
                return history.push(VENUES);

              if (
                contentDrawer().show &&
                window.location.pathname !== VENUES
              ) {
                return history.goBack();
              }

              if (history.location.pathname === VENUES)
                return scrollTop();
            }}
            label={matches ? <HomeWorkOutlined /> : 'Venues'}
          />
        </Tooltip>
        <Tooltip title={matches ? 'Events' : ''}>
          <Tab
            onClick={(e) => {
              e.stopPropagation();

              if (history.location.pathname !== EVENTS)
                return history.push(EVENTS);

              if (
                contentDrawer().show &&
                window.location.pathname !== EVENTS
              ) {
                return history.goBack();
              }

              if (history.location.pathname === EVENTS)
                return scrollTop();
            }}
            label={matches ? <EventOutlined /> : 'Events'}
          />
        </Tooltip>
        <Tooltip title={matches ? 'Jobs' : ''}>
          <Tab
            onClick={(e) => {
              e.stopPropagation();

              if (history.location.pathname !== JOBS)
                return history.push(JOBS);

              if (
                contentDrawer().show &&
                window.location.pathname !== JOBS
              ) {
                return history.goBack();
              }

              if (history.location.pathname === JOBS)
                return scrollTop();
            }}
            label={matches ? <WorkOutlineOutlined /> : 'Jobs'}
          />
        </Tooltip>
      </Tabs>
    );
  },
  (prevProps, nextProps) => {
    // if (prevProps.value !== nextProps.value) return false;
    // return true;
  },
);

export default AppBarTabs;
