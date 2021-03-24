import queryString from 'query-string';
import INITIAL_STATE from '../constants/initialJobSearch';

export const queryParams = queryString.parse(window.location.search);

export const queryParamsTransObject = (queryParams) => ({
  keywords: queryParams.k || INITIAL_STATE.keywords,
  location: {
    name: queryParams.l || INITIAL_STATE.location.name,
    lat: INITIAL_STATE.location.lat,
    lon: INITIAL_STATE.location.lon,
  },
  regions: queryParams.r
    ? Array.isArray(queryParams.r)
      ? queryParams.r
      : [queryParams.r]
    : INITIAL_STATE.regions,
  types: queryParams.t
    ? Array.isArray(queryParams.t)
      ? queryParams.t
      : [queryParams.t]
    : INITIAL_STATE.types,
});

export const queryParamGenerate = () => {
  const queryParams = queryString.parse(window.location.search);

  return {
    keywords: queryParams.k || INITIAL_STATE.keywords,
    location: {
      name: queryParams.l || INITIAL_STATE.location.name,
      lat: INITIAL_STATE.location.lat,
      lon: INITIAL_STATE.location.lon,
    },
    regions: queryParams.r
      ? Array.isArray(queryParams.r)
        ? queryParams.r
        : [queryParmas.r]
      : INITIAL_STATE.regions,
    types: queryParams.t
      ? Array.isArray(queryParams.t)
        ? queryParams.t
        : [queryParams.t]
      : INITIAL_STATE.types,
  };
};

export const queryObject = (filter) => ({
  k: filter.keywords,
  l: filter?.location?.name,
  r: filter?.regions,
  t: filter?.types,
});

export const getQueryString = (filter) =>
  queryString.stringify(queryObject(filter), {
    skipNull: true,
    skipEmptyString: true,
  });
