import React from 'react';
import {
  Search,
  LocationOn,
  Public,
  WorkOutlineOutlined,
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
    fontSize: '0.8rem',
    color: 'white',
    display: 'inline-block',
  },
  icon: {
    height: 20,
    verticalAlign: 'middle',
  },
}));

const SearchBreadCrumbs = React.memo(
  ({}) => {
    const classes = useStyles();
    const { type, searchVar } = routeConfig();
    const { keywords } = searchVar();

    return (
      <div>
        <Breadcrumbs
          onClick={(event) => {
            event.stopPropagation();
            filterSearch({ show: !filterSearch().show });
          }}
          className={classes.root}
        >
          {keywords && (
            <Fade in>
              <div title="Keywords">
                <Search className={classes.icon} />
                <DebounceInput
                  onFocus={(event) => {
                    event.currentTarget.select();
                    backdrop(true);
                  }}
                  onBlur={() => backdrop(false)}
                  onKeyDown={(event) => {
                    if (event.keyCode === 27) {
                      event.preventDefault();
                      quickSearch({ show: false });
                      backdrop(false);
                    }
                    if (event.keyCode === 191) {
                      event.preventDefault();
                    }
                  }}
                  onKeyUp={(event) => {
                    if (event.keyCode === 191) {
                      quickSearch({ show: false });
                      backdrop(false);
                    }
                  }}
                  className={classes.searchInput}
                  onClick={(event) => event.stopPropagation()}
                  element={InputBase}
                  inputProps={{
                    style: {
                      textOverflow: 'ellipsis',
                      display: 'inline-block',
                      maxWidth: '25vw',
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
          {searchVar().regions.length && (
            <Fade in>
              <Typography title="Regions" variant="caption">
                <Public className={classes.icon} />
                {searchVar().regions.length
                  ? searchVar().regions.join(', ')
                  : '...'}
              </Typography>
            </Fade>
          )}

          {searchVar().types.length && (
            <Fade in>
              <Typography title="Types" variant="caption">
                <WorkOutlineOutlined className={classes.icon} />
                {searchVar().types.length
                  ? searchVar().types.join(', ')
                  : '...'}
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
