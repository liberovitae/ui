import {
  VENUE_BASE,
  JOB_BASE,
  EVENT_BASE,
  COMPANY_BASE,
} from '../constants/routes';
import { job, venue, event, company } from '../constants/routeConfig';
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

  if (pathname.startsWith(COMPANY_BASE)) {
    return company;
  }

  return event;
};

export default routePicker;
