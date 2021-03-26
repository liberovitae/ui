import queryString from 'query-string';
import INITIAL_SEARCH_STATE from '../constants/routeConfig/job/initialJobSearch';

export const queryParams = queryString.parse(window.location.search);

export const queryParamsTransObject = (queryParams) => ({
  keywords: queryParams.k || INITIAL_SEARCH_STATE.keywords,
  location: {
    name: queryParams.l || INITIAL_SEARCH_STATE.location.name,
    lat: INITIAL_SEARCH_STATE.location.lat,
    lon: INITIAL_SEARCH_STATE.location.lon,
  },

  types: queryParams.t
    ? Array.isArray(queryParams.t)
      ? queryParams.t
      : [queryParams.t]
    : INITIAL_SEARCH_STATE.types,
});

export const queryParamGenerate = () => {
  const queryParams = queryString.parse(window.location.search);

  return {
    keywords: queryParams.k || INITIAL_SEARCH_STATE.keywords,
    location: {
      name: queryParams.l || INITIAL_SEARCH_STATE.location.name,
      lat: INITIAL_SEARCH_STATE.location.lat,
      lon: INITIAL_SEARCH_STATE.location.lon,
    },

    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : INITIAL_SEARCH_STATE.types,
  };
};

export const queryObject = (filter) => ({
  k: filter.keywords,
  l: filter?.location?.name,
  t: filter?.types,
});

export const getQueryString = (filter) =>
  queryString.stringify(queryObject(filter), {
    skipNull: true,
    skipEmptyString: true,
  });
