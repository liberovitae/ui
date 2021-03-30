import React, { useEffect, useState } from 'react';
import { useLastLocation } from 'react-router-last-location';
import { useReactiveVar } from '@apollo/client';
import {
  queryParamsTransObject,
  getQueryString,
  objCompare,
  handleRoutes,
} from '../../helpers';
import { useHotkeys } from 'react-hotkeys-hook';
import Appbar from './Appbar';
import {
  quickSearch,
  filterSearch,
  backdrop,
  routeConfig,
  navSidebar,
  contentDrawer,
} from '../../constants/globalVars';
import { scrollTop } from '../Shared/ScrollTop';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import queryString from 'query-string';
import { ALERT_BASE, LANDING } from '../../constants/routes';

const NavBar = React.memo(
  ({ history, session }) => {
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const { searchVar } = reactiveRouteConfig;
    const reactiveSearch = useReactiveVar(searchVar);
    const lastLocation = useLastLocation();
    const [scrollPosition, setScrollPosition] = useState(null);
    const queryStringNew = getQueryString(reactiveSearch);

    useScrollPosition(({ prevPos, currPos }) => {
      setScrollPosition(currPos.y);
    });

    useHotkeys(
      'ctrl+space,shift+/,esc',
      (event, handler) => {
        const inputElem = document.getElementById('search');
        switch (handler.key) {
          case 'ctrl+space':
            quickSearch({
              autofocus: true,
              show: !quickSearch().show,
            });
            if (inputElem) {
              inputElem.focus();
              inputElem.select();
            }
            break;
          case 'shift+/':
            if (filterSearch().show) {
              filterSearch({ show: false });
              backdrop(false);
              break;
            }
            filterSearch({ show: true });
            break;
          case 'esc':
            filterSearch({ show: false });
            quickSearch({ show: false });
            backdrop(false);
            break;
        }
      },
      {
        keyup: true,
      },
    );

    // Below lies the dragons of navigation, a bunch of conditionals/useEffects to
    // make sure that searching, scrolling and navigation behaves correctly.
    // This should and can be improved at some point.

    useEffect(() => {
      const queryParams = queryString.parse(history.location.search);
      if (
        queryStringNew !== history.location.search &&
        !objCompare(
          // This comparison stops double back bug in navigation/react router!?
          queryParamsTransObject(
            queryParams,
            reactiveRouteConfig.INITIAL_SEARCH_STATE,
          ),
          reactiveSearch,
        ) &&
        !history.location.pathname.startsWith(ALERT_BASE) &&
        history.location.pathname.startsWith(
          reactiveRouteConfig.routes.landing,
        )
      ) {
        quickSearch().show && quickSearch({ show: false });
        contentDrawer().show &&
          contentDrawer({ ...contentDrawer(), show: false });
        history.push({
          pathname: reactiveRouteConfig.routes.landing,
          search: queryStringNew,
        });
      }
    }, [reactiveSearch]);

    // useEffect for handling backwards/fowards navigation & search
    useEffect(() => {
      if (
        !contentDrawer().show &&
        history.location.pathname === routeConfig().routes.landing &&
        lastLocation?.search !== history.location.search
      ) {
        const queryParams = queryString.parse(window.location.search);
        searchVar(
          queryParamsTransObject(
            queryParams,
            reactiveRouteConfig.INITIAL_SEARCH_STATE,
          ),
        );
      }

      const savedScrollPosition = JSON.parse(
        sessionStorage.getItem(
          `${reactiveRouteConfig.type}${history.location.search}`,
        ),
      );

      if (
        savedScrollPosition &&
        history.location.pathname === routeConfig().routes.landing
      ) {
        setTimeout(
          () =>
            window.scrollTo({
              top: Math.abs(savedScrollPosition),
              behavior: 'smooth',
            }),
          10,
        );
      }
    }, [reactiveRouteConfig]);

    // Listener for route handling saving and restoring scroll positions
    useEffect(() => {
      window.onpopstate = (e) => {
        quickSearch({ show: false });
        filterSearch({ show: false });
        contentDrawer().show &&
          contentDrawer({ ...contentDrawer(), show: false });
        backdrop(false);
        navSidebar(false);
      };

      // Push to data type route for now until we have a different landing page
      if (history.location.pathname === LANDING)
        history.push(routeConfig().routes.landing);

      contentDrawer().show &&
        contentDrawer({ ...contentDrawer(), show: false });

      handleRoutes({ lastLocation });

      const savedScrollPosition = JSON.parse(
        sessionStorage.getItem(
          `${routeConfig().type}${history.location.search}`,
        ),
      );

      if (
        savedScrollPosition < 0 &&
        history.location.pathname === routeConfig().routes.landing
      ) {
        setTimeout(
          () =>
            window.scrollTo({
              top: Math.abs(savedScrollPosition),
              behavior: 'smooth',
            }),
          10,
        );
      }

      if (
        lastLocation?.pathname ===
          reactiveRouteConfig.routes.landing &&
        window.location.pathname !== routeConfig().routes.base
      )
        sessionStorage.setItem(
          `${reactiveRouteConfig.type}${history.location.search}`,
          scrollPosition,
        );

      if (
        history.location.pathname !== routeConfig().routes.landing
      ) {
        scrollTop();
        return;
      }
    }, [history.location]);

    return (
      <Appbar
        history={history}
        session={session}
        lastLocation={lastLocation}
      />
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.session !== nextProps.session) return false;
    return true;
  },
);

export default NavBar;
