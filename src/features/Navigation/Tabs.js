import React from 'react';
import { Tooltip, Tabs, Tab, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import history from '../../constants/history';
import { contentDrawer, tabIndex } from '../../constants/globalVars';
import { scrollTop } from '../Shared';
import * as ROUTE_CONFIGS from '../../constants/routeConfig';

const AppBarTabs = React.memo(
  ({}) => {
    const routesArr = Object.values(ROUTE_CONFIGS);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));

    // Filter out routes without tabs & sort by index
    const tabbedRoutes = routesArr
      .filter((route) => route.hasTab === true)
      .sort((a, b) => a.tabIndex - b.tabIndex);

    const handleTabChange = (e, index) => {
      if (tabIndex() === index) return;

      history.push(tabbedRoutes[index].routes.landing);
    };

    return (
      <Tabs
        value={tabIndex()}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="off"
      >
        {tabbedRoutes.map((route) => {
          const { routes, Icon } = route;
          return (
            <Tooltip
              key={route.tabIndex + route.type}
              title={matches ? `${route.type}s` : ''}
            >
              <Tab
                onClick={(e) => {
                  e.stopPropagation();

                  if (history.location.pathname !== routes.landing)
                    return history.push(routes.landing);

                  if (
                    contentDrawer().show &&
                    window.location.pathname !== routes.landing
                  ) {
                    return history.goBack();
                  }

                  if (history.location.pathname === routes.landing)
                    return scrollTop();
                }}
                label={
                  matches ? (
                    <Icon />
                  ) : (
                    <span>
                      <Icon
                        fontSize="small"
                        style={{
                          verticalAlign: 'sub',
                          marginRight: '0.2rem',
                        }}
                      />{' '}
                      {route.type}s
                    </span>
                  )
                }
              />
            </Tooltip>
          );
        })}
      </Tabs>
    );
  },
  (prevProps, nextProps) => {},
);

export default AppBarTabs;
