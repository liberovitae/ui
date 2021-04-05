import {
  routeConfig,
  filterSearch,
  quickSearch,
  siteHeader,
  backdrop,
} from '../constants/globalVars';
import INITIAL_SEARCH_STATE from '../constants/initialSearch';
import { client } from '../index';
import history from '../constants/history';
import { getQueryString } from './queryParams';

const handleReset = () => {
  const queryStringNew = getQueryString(routeConfig().searchVar());

  routeConfig().searchVar(INITIAL_SEARCH_STATE);
  quickSearch({ show: false });
  filterSearch({ show: false });
  backdrop(false);
  client.cache.evict({
    id: 'ROOT_QUERY',
    fieldName: `posts:${routeConfig().type}`,
  });
  client.cache.gc();
  history.location.pathname === routeConfig().routes.landing &&
    siteHeader(routeConfig().defaultSiteHeader);

  sessionStorage.removeItem(`${routeConfig().type}${queryStringNew}`);
};

export default handleReset;
