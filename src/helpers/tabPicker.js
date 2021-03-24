import { VENUE_BASE, JOB_BASE } from '../constants/routes';
import history from '../constants/history';

const { pathname } = history.location;

const tabPicker = () => {
  if (pathname.startsWith(VENUE_BASE)) {
    return 0;
  }

  if (pathname.startsWith(JOB_BASE)) {
    return 1;
  }
  return 0;
};

export default tabPicker;
