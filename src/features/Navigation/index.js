import React, { useEffect, useState } from 'react';
import { useLastLocation } from 'react-router-last-location';
import { useReactiveVar } from '@apollo/client';
import {
  queryParamsTransObject,
  getQueryString,
  objCompare,
  handleRoutes,
  restoreScrollPosition,
} from '../../helpers';
import { useHotkeys } from 'react-hotkeys-hook';
import INITIAL_SEARCH_STATE from '../../constants/initialSearch';
import Appbar from './Appbar';
import {
  quickSearch,
  filterSearch,
  backdrop,
  routeConfig,
  navSidebar,
  contentDrawer,
} from '../../constants/globalVars';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import queryString from 'query-string';

const NavBar = React.memo(
  ({ history, session }) => {
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const { searchVar } = reactiveRouteConfig;
    const reactiveSearch = useReactiveVar(searchVar);
    const lastLocation = useLastLocation();
    const [scrollPosition, setScrollPosition] = useState(null);

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

    const closeModals = () => {
      quickSearch({ show: false });
      contentDrawer({ ...contentDrawer(), show: false });
      filterSearch({ show: false });
      backdrop(false);
      navSidebar(false);
    };

    // Below lies the dragons of navigation, a bunch of conditionals/useEffects to
    // make sure that searching, scrolling and navigation behaves correctly.
    // This should and can be improved at some point.

    useEffect(() => {
      const queryStringNew = getQueryString(reactiveSearch);
      const queryParams = queryString.parse(history.location.search);

      if (
        history.location.search !== queryStringNew &&
        !objCompare(
          queryParamsTransObject(queryParams, INITIAL_SEARCH_STATE),
          reactiveSearch,
        )
      ) {
        // Close model overlays
        closeModals();

        // Update history pathname and querystring from reactiveSearch
        history.push({
          pathname: reactiveRouteConfig.routes.landing,
          search: queryStringNew,
        });
      }
    }, [reactiveSearch]);

    // useEffect for handling backwards/fowards navigation & search
    useEffect(() => {
      restoreScrollPosition({
        type: reactiveRouteConfig.type,
        key: history.location.search,
      });
    }, [reactiveRouteConfig]);

    // Listener for route handling saving and restoring scroll positions
    useEffect(() => {
      window.onpopstate = (e) => {
        // Close all modals on navigation change instead of navigating
        closeModals();
        return;
      };

      const { routes } = reactiveRouteConfig;

      if (history.location.pathname === routes.base) {
        restoreScrollPosition({
          type: reactiveRouteConfig.type,
          key: history.location.search,
        });
      }

      if (
        lastLocation?.pathname === routes.landing &&
        window.location.pathname !== routes.base
      )
        sessionStorage.setItem(
          `${reactiveRouteConfig.type}${history.location.search}`,
          scrollPosition,
        );

      if (
        lastLocation?.search !== history.location.search &&
        lastLocation?.pathname === history.location.pathname
      ) {
        const queryParams = queryString.parse(window.location.search);
        searchVar(
          queryParamsTransObject(queryParams, INITIAL_SEARCH_STATE),
        );

        return;
      }

      closeModals();
      // Main route handler
      handleRoutes();
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
