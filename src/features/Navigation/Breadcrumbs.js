import React from 'react';
import {
  Search,
  LocationOn,
  DateRange,
  DoubleArrow,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Breadcrumbs, Fade } from '@material-ui/core';
import {
  filterSearch,
  backdrop,
  quickSearch,
  routeConfig,
} from '../../constants/globalVars';
import { DebounceInput } from 'react-debounce-input';
import { InputBase } from '@material-ui/core';
import handleSearch from '../../helpers/handleSearch';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.dark
        : theme.palette.primary.light,
    color: theme.palette.grey[50],
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'flex-start',
    padding: '0.3rem',
    paddingLeft: '1rem',
  },
  searchInput: {
    verticalAlign: 'middle',
    fontSize: '0.75rem',
    color: 'white',
    display: 'inline-block',
  },
  icon: {
    height: '1.25rem',
    verticalAlign: 'text-bottom',
    marginRight: '0.1rem',
  },
}));

const SearchBreadCrumbs = React.memo(
  ({}) => {
    const classes = useStyles();
    const { type, searchVar, Icon } = routeConfig();
    const { keywords, dates } = searchVar();

    const startDate = dayjs(dates?.start).format('MMM D');
    const endDate = dayjs(dates?.end).format('MMM D');

    return (
      <div>
        <Breadcrumbs
          onClick={(e) => {
            e.stopPropagation();
            filterSearch({ show: !filterSearch().show });
          }}
          className={classes.root}
        >
          {keywords && (
            <Fade in>
              <div
                style={{ marginBottom: '0.2rem' }}
                title="Keywords"
              >
                <Search
                  className={classes.icon}
                  style={{ verticalAlign: 'middle' }}
                />
                <DebounceInput
                  onFocus={(e) => {
                    e.currentTarget.select();
                    backdrop(true);
                  }}
                  onBlur={() => backdrop(false)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 27) {
                      e.preventDefault();
                      quickSearch({ show: false });
                      backdrop(false);
                    }
                    if (e.keyCode === 191) {
                      e.preventDefault();
                    }
                  }}
                  onKeyUp={(e) => {
                    if (e.keyCode === 191) {
                      quickSearch({ show: false });
                      backdrop(false);
                    }
                  }}
                  className={classes.searchInput}
                  onClick={(e) => e.stopPropagation()}
                  element={InputBase}
                  inputProps={{
                    style: {
                      textOverflow: 'ellipsis',
                      display: 'inline-block',
                      maxWidth: '25vw',
                      padding: 0,
                      width: keywords.length / 2.1 + 1 + 'em',
                    },
                  }}
                  placeholder={`Search ${type}s`}
                  debounceTimeout={800}
                  name="keywords"
                  value={keywords}
                  onChange={handleSearch}
                  onSubmit={handleSearch}
                />
              </div>
            </Fade>
          )}

          {searchVar().location.name.length && (
            <Fade in>
              <Typography title="Location" variant="caption">
                <LocationOn className={classes.icon} />
                {searchVar().location.name || '...'}
              </Typography>
            </Fade>
          )}

          {searchVar().types.length && (
            <Fade in>
              <Typography title="Types" variant="caption">
                <Icon className={classes.icon} />
                {searchVar().types.length
                  ? searchVar().types.join(', ')
                  : '...'}
              </Typography>
            </Fade>
          )}

          {dates?.start && dates?.end && (
            <Fade in>
              <Typography title="Dates" variant="caption">
                <DateRange className={classes.icon} />
                {startDate}
                {startDate !== endDate && (
                  <>
                    <DoubleArrow className={classes.icon} />
                    {endDate}
                  </>
                )}
              </Typography>
            </Fade>
          )}
        </Breadcrumbs>
      </div>
    );
  },
  (prevProps, nextProps) => {},
);
export default SearchBreadCrumbs;
