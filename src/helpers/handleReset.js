import {
  routeConfig,
  filterSearch,
  quickSearch,
  siteHeader,
  backdrop,
} from '../constants/globalVars';
import { client } from '../index';
import history from '../constants/history';
import { getQueryString } from './queryParams';

const handleReset = (event) => {
  const queryStringNew = getQueryString(routeConfig().searchVar());

  routeConfig().searchVar(routeConfig().INITIAL_STATE);

  quickSearch({ show: false });
  filterSearch({ show: false });
  backdrop(false);
  client.cache.evict({
    id: 'ROOT_QUERY',
    fieldName: `${routeConfig().type}s`,
  });
  client.cache.gc();
  history.location.pathname === routeConfig().routes.landing &&
    siteHeader(routeConfig().defaultSiteHeader);
  history.push({ search: null });
  sessionStorage.removeItem(`${routeConfig().type}${queryStringNew}`);
};

export default handleReset;
