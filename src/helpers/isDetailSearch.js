const isDetailSearch = (filter) => {
  return filter.location.name.length > 0 || filter.types.length > 0;
};

export default isDetailSearch;
