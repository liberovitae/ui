import {
  VENUE_BASE,
  JOB_BASE,
  EVENT_BASE,
} from '../constants/routes';
import { job, venue, event } from '../constants/routeConfig';
import history from '../constants/history';

const { pathname } = history.location;

const routePicker = () => {
  if (pathname.startsWith(VENUE_BASE)) {
    return venue;
  }

  if (pathname.startsWith(EVENT_BASE)) {
    return event;
  }

  if (pathname.startsWith(JOB_BASE)) {
    return job;
  }

  return venue;
};

export default routePicker;
