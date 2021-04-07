import { routeConfig, tabIndex } from '../constants/globalVars';
import * as ROUTE_CONFIGS from '../constants/routeConfig';
import history from '../constants/history';

const handleRoutes = () => {
  const routesArr = Object.values(ROUTE_CONFIGS);
  const { pathname } = history.location;

  const route = routesArr.find((route) =>
    pathname.includes(route.routes.base),
  );

  if (route) {
    routeConfig(route);
    tabIndex() !== tabIndex && tabIndex(route.tabIndex);
    return;
  }
};

export default handleRoutes;
