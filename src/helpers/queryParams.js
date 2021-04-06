import queryString from 'query-string';
import dayjs from 'dayjs';
import INITIAL_SEARCH_STATE from '../constants/initialSearch';

export const queryParams = queryString.parse(window.location.search);

const initialDates = {
  dates: {
    start: null,
    end: null,
  },
};

export const queryParamsTransObject = (queryParams) => {
  const dates =
    queryParams?.sd && queryParams?.ed
      ? {
          dates: {
            start: new Date(queryParams.sd),
            end: new Date(queryParams.ed),
          },
        }
      : initialDates;

  return {
    ...INITIAL_SEARCH_STATE,
    keywords: queryParams.k || INITIAL_SEARCH_STATE.keywords,
    location: {
      name: queryParams.l || INITIAL_SEARCH_STATE.location.name,
      lat: INITIAL_SEARCH_STATE.location.lat,
      lon: INITIAL_SEARCH_STATE.location.lon,
    },
    ...dates,
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : INITIAL_SEARCH_STATE.types,
  };
};

export const queryParamGenerate = () => {
  const queryParams = queryString.parse(window.location.search);

  const dates =
    queryParams?.sd && queryParams?.ed
      ? {
          dates: {
            start: new Date(queryParams.sd),
            end: new Date(queryParams.ed),
          },
        }
      : initialDates;

  return {
    keywords: queryParams.k || INITIAL_SEARCH_STATE.keywords,
    location: {
      name: queryParams.l || INITIAL_SEARCH_STATE.location.name,
      lat: INITIAL_SEARCH_STATE.location.lat,
      lon: INITIAL_SEARCH_STATE.location.lon,
    },
    ...dates,
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : INITIAL_SEARCH_STATE.types,
  };
};

export const queryObject = (filter) => {
  const startDate = dayjs(filter?.dates?.start || null).format(
    'YYYY-MM-DD',
  );
  const endDate = dayjs(filter?.dates?.end || null).format(
    'YYYY-MM-DD',
  );

  const dates = dayjs(startDate).isValid()
    ? { sd: startDate, ed: endDate }
    : null;

  return {
    k: filter.keywords,
    l: filter?.location?.name,
    ...dates,
    t: filter?.types,
  };
};

export const getQueryString = (filter) =>
  queryString.stringify(queryObject(filter), {
    skipNull: true,
    skipEmptyString: true,
  });
