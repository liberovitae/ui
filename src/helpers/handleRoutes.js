import queryString from 'query-string';
import { routeConfig, tabIndex } from '../constants/globalVars';
import { venue, event, job, company } from '../constants/routeConfig';
import history from '../constants/history';
import { objCompare, queryParamsTransObject } from '.';
import {
  JOB_BASE,
  VENUE_BASE,
  EVENT_BASE,
  COMPANY_BASE,
} from '../constants/routes';
import INITIAL_SEARCH_STATE from '../constants/initialSearch';

const handleRoutes = ({ lastLocation }) => {
  const { searchVar, type } = routeConfig();

  if (
    history.location.pathname.includes(JOB_BASE) &&
    type !== 'job'
  ) {
    routeConfig(job);
    tabIndex() !== tabIndex && tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    history.location.pathname.includes(VENUE_BASE) &&
    type !== 'venue'
  ) {
    routeConfig(venue);
    tabIndex() !== routeConfig().tabIndex &&
      tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    history.location.pathname.includes(EVENT_BASE) &&
    type !== 'event'
  ) {
    routeConfig(event);
    tabIndex() !== routeConfig().tabIndex &&
      tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    history.location.pathname.includes(COMPANY_BASE) &&
    type !== 'company'
  ) {
    routeConfig(company);
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
