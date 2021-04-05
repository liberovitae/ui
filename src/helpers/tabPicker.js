import {
  VENUE_BASE,
  JOB_BASE,
  EVENT_BASE,
  COMPANY_BASE,
} from '../constants/routes';
import history from '../constants/history';

const { pathname } = history.location;

const tabPicker = () => {
  if (pathname.startsWith(EVENT_BASE)) {
    return 0;
  }

  if (pathname.startsWith(VENUE_BASE)) {
    return 1;
  }

  if (pathname.startsWith(JOB_BASE)) {
    return 2;
  }
  if (pathname.startsWith(COMPANY_BASE)) {
    return 2;
  }
  return 0;
};

export default tabPicker;
