import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useReactiveVar } from '@apollo/client';
import {
  routeConfig,
  quickSearch,
  filterSearch,
} from '../../constants/globalVars';
import { handleSearch } from '../../helpers';
import { Backdrop, Grid } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import SearchBar from 'material-ui-search-bar';
import { makeStyles } from '@material-ui/core/styles';
import { Calendar } from '../Shared/Inputs';

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
    marginBottom: '1rem',
  },
}));

const Quicksearch = ({}) => {
  const intl = useIntl();
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const reactiveSearch = reactiveRouteConfig.searchVar;
  const reactiveQuicksearch = useReactiveVar(quickSearch);
  const reactiveFilterSearch = useReactiveVar(filterSearch);
  const classes = useStyles();
  const { type } = reactiveRouteConfig;
  let ref = React.createRef();

  useEffect(() => {
    ref && ref.current?.focus();
  }, [ref]);

  return (
    <Backdrop
      onClick={() => quickSearch({ show: false })}
      className={classes.backdrop}
      open={reactiveQuicksearch.show && !reactiveFilterSearch.show}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>
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
            placeholder={intl.formatMessage(
              {
                id: 'search.posts',
              },
              { type },
            )}
          />
          {reactiveRouteConfig?.hasDates && (
            <Calendar reactiveRouteConfig={reactiveRouteConfig} />
          )}
        </Grid>
      </Grid>
    </Backdrop>
  );
};

export default Quicksearch;
