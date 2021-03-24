import queryString from 'query-string';
import { routeConfig, tabIndex } from '../constants/globalVars';
import routeConfigs from '../constants/routeConfig';
import history from '../constants/history';
import { objCompare, queryParamsTransObject } from '.';
import { JOB_BASE, VENUE_BASE } from '../constants/routes';

const handleRoutes = ({ lastLocation }) => {
  const { searchVar, type, INITIAL_STATE } = routeConfig();

  if (
    (!lastLocation?.pathname.includes(JOB_BASE) &&
      history.location.pathname.includes(JOB_BASE)) ||
    history.location.pathname.includes('company')
  ) {
    type !== 'job' && routeConfig(routeConfigs.job);
    tabIndex() !== tabIndex && tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    !lastLocation?.pathname.includes(VENUE_BASE) &&
    history.location.pathname.includes(VENUE_BASE)
  ) {
    type !== 'venue' && routeConfig(routeConfigs.venue);
    tabIndex() !== routeConfig().tabIndex &&
      tabIndex(routeConfig().tabIndex);
    return;
  }

  if (
    history.location.pathname === routeConfig().routes.landing &&
    !history.location.search
  ) {
    searchVar(INITIAL_STATE);
    return;
  }

  if (
    lastLocation?.search !== history.location.search &&
    lastLocation?.pathname === history.location.pathname
  ) {
    const queryParams = queryString.parse(window.location.search);
    searchVar(queryParamsTransObject(queryParams));

    return;
  }

  if (objCompare(searchVar(), INITIAL_STATE)) {
    searchVar(INITIAL_STATE);
  }
};

export default handleRoutes;
