import queryString from 'query-string';
import dayjs from 'dayjs';

export const queryParams = queryString.parse(window.location.search);

export const queryParamsTransObject = (queryParams, initialState) => {
  return {
    keywords: queryParams.k || initialState.keywords,

    location: {
      name: queryParams.l || initialState.location.name,
      lat: initialState.location.lat,
      lon: initialState.location.lon,
    },
    dates: {
      start: queryParams.sd
        ? new Date(queryParams.sd)
        : initialState.dates.start,
      end: queryParams.ed
        ? new Date(queryParams.ed)
        : initialState.dates.end,
    },
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : initialState.types,
  };
};

export const queryParamGenerate = (initialState) => {
  const queryParams = queryString.parse(window.location.search);

  const dates =
    queryParams.sd && queryParams.ed
      ? {
          dates: {
            start: new Date(queryParams.sd),
            end: new Date(queryParams.ed),
          },
        }
      : null;

  return {
    keywords: queryParams.k || initialState.keywords,
    location: {
      name: queryParams.l || initialState.location.name,
      lat: initialState.location.lat,
      lon: initialState.location.lon,
    },
    ...dates,
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : initialState.types,
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
