import queryString from 'query-string';
// import initialState from '../constants/routeConfig/job/initialJobSearch';

export const queryParams = queryString.parse(window.location.search);

export const queryParamsTransObject = (queryParams, initialState) => {
  // const dates = initialState.dates
  //   ? { dates: initialState.dates }
  //   : null;
  return {
    keywords: queryParams.k || initialState.keywords,
    location: {
      name: queryParams.l || initialState.location.name,
      lat: initialState.location.lat,
      lon: initialState.location.lon,
    },
    // ...dates,
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : initialState.types,
  };
};

export const queryParamGenerate = (initialState) => {
  const queryParams = queryString.parse(window.location.search);

  // const dates = initialState.dates
  //   ? { dates: initialState.dates }
  //   : null;
  return {
    keywords: queryParams.k || initialState.keywords,
    location: {
      name: queryParams.l || initialState.location.name,
      lat: initialState.location.lat,
      lon: initialState.location.lon,
    },
    // ...dates,
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : initialState.types,
  };
};

export const queryObject = (filter) => ({
  k: filter.keywords,
  l: filter?.location?.name,
  t: filter?.types,
  // d: filter?.dates,
});

export const getQueryString = (filter) =>
  queryString.stringify(queryObject(filter), {
    skipNull: true,
    skipEmptyString: true,
  });
