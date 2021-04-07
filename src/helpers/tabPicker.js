import history from '../constants/history';
import * as ROUTE_CONFIGS from '../constants/routeConfig';

const tabPicker = () => {
  const routesArr = Object.values(ROUTE_CONFIGS);
  const { pathname } = history.location;

  const route = routesArr.find((route) =>
    pathname.startsWith(route.routes.base),
  );

  if (route) return route.tabIndex;

  return 0;
};

export default tabPicker;
