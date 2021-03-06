import React, { useEffect } from 'react';
import { useReactiveVar } from '@apollo/client';
import { routeConfig, quickSearch } from '../../constants/globalVars';
import { handleSearch } from '../../helpers';
import { Backdrop } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
  },
  backdrop: {
    zIndex: 100,
    backdropFilter: 'blur(3px) saturate(0.25)',
  },
  searchBar: {
    zIndex: 105,
  },
}));

const Quicksearch = ({}) => {
  const reactiveSearch = useReactiveVar(routeConfig().searchVar);
  const reactiveQuicksearch = useReactiveVar(quickSearch);
  const classes = useStyles();

  let ref = React.createRef();

  useEffect(() => {
    ref && ref.current?.focus();
  }, [ref]);

  return (
    <Backdrop
      onClick={() => quickSearch({ show: false })}
      className={classes.backdrop}
      open={reactiveQuicksearch.show}
    >
      <SearchBar
        innerRef={ref}
        onClick={(e) => {
          e.stopPropagation();
        }}
        id="search"
        onCancelSearch={(e) => {
          routeConfig().searchVar({
            ...reactiveSearch,
            keywords: '',
          });
        }}
        className={classes.searchBar}
        cancelOnEscape
        closeIcon={<Close className={classes.icon} />}
        searchIcon={<Search className={classes.icon} />}
        value={reactiveSearch.keywords}
        onRequestSearch={handleSearch}
        placeholder={`Search ${routeConfig().type}s`}
      />
    </Backdrop>
  );
};

export default Quicksearch;
