import { VENUE_BASE, JOB_BASE } from '../constants/routes';
import ROUTE_CONFIG from '../constants/routeConfig';
import history from '../constants/history';

const { job, venue } = ROUTE_CONFIG;
const { pathname } = history.location;

const routePicker = () => {
  if (pathname.startsWith(VENUE_BASE)) {
    return venue;
  }

  if (pathname.startsWith(JOB_BASE)) {
    return job;
  }
  return venue;
};

export default routePicker;
