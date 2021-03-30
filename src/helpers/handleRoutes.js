import queryString from 'query-string';
import { routeConfig, tabIndex } from '../constants/globalVars';
import { venue, event, job } from '../constants/routeConfig';
import history from '../constants/history';
import { objCompare, queryParamsTransObject } from '.';
import {
  JOB_BASE,
  VENUE_BASE,
  EVENT_BASE,
} from '../constants/routes';

const handleRoutes = ({ lastLocation }) => {
  const { searchVar, type, INITIAL_SEARCH_STATE } = routeConfig();

  if (
    (!lastLocation?.pathname.includes(JOB_BASE) &&
      history.location.pathname.includes(JOB_BASE)) ||
    history.location.pathname.includes('company')
  ) {
    type !== 'job' && routeConfig(job);
    tabIndex() !== tabIndex && tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    !lastLocation?.pathname.includes(VENUE_BASE) &&
    history.location.pathname.includes(VENUE_BASE)
  ) {
    type !== 'venue' && routeConfig(venue);
    tabIndex() !== routeConfig().tabIndex &&
      tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    !lastLocation?.pathname.includes(EVENT_BASE) &&
    history.location.pathname.includes(EVENT_BASE)
  ) {
    type !== 'event' && routeConfig(event);
    tabIndex() !== routeConfig().tabIndex &&
      tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    history.location.pathname === routeConfig().routes.landing &&
    !history.location.search
  ) {
    searchVar(INITIAL_SEARCH_STATE);
    return;
  }

  if (
    lastLocation?.search !== history.location.search &&
    lastLocation?.pathname === history.location.pathname
  ) {
    const queryParams = queryString.parse(window.location.search);
    searchVar(
      queryParamsTransObject(
        queryParams,
        routeConfig().INITIAL_SEARCH_STATE,
      ),
    );

    return;
  }

  if (objCompare(searchVar(), INITIAL_SEARCH_STATE)) {
    searchVar(INITIAL_SEARCH_STATE);
  }
};

export default handleRoutes;
