import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { VENUES, JOBS } from '../../constants/routes';
import history from '../../constants/history';
import { contentDrawer, tabIndex } from '../../constants/globalVars';
import { scrollTop } from '../Shared/ScrollTop';

const handleTabChange = (e, index) => {
  if (tabIndex() === index) return;

  if (index === 0) {
    history.push(VENUES);
  }

  if (index === 1) {
    history.push(JOBS);
  }
};

const AppBarTabs = React.memo(
  ({}) => {
    return (
      <Tabs
        value={tabIndex()}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="off"
      >
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
          label="Venues"
        />
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
          label="Jobs"
        />
      </Tabs>
    );
  },
  (prevProps, nextProps) => {
    // if (prevProps.value !== nextProps.value) return false;
    // return true;
  },
);

export default AppBarTabs;
