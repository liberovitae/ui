import { filterSearch, routeConfig } from '../constants/globalVars';
import { scrollTop } from '../features/Shared/ScrollTop';
import history from '../constants/history';

const handleSearch = (event) => {
  let value;

  // Assign value from JS event or "event" is value
  event?.target?.value
    ? (value = event.target.value)
    : (value = event);

  if (value.length >= 2) {
    filterSearch().show && filterSearch({ show: false });

    routeConfig().searchVar({
      ...routeConfig().searchVar(),
      keywords: value,
      location: { name: routeConfig().searchVar().location.name },
      types: routeConfig().searchVar().types,
    });
    history.location.pathname !== routeConfig().routes.landing &&
      history.push(routeConfig().routes.landing);
    scrollTop();
  }
};

export default handleSearch;
