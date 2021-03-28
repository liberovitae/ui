import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { IconButton, Hidden, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  ExpandMore,
  Search,
  Close,
  Menu,
  BrightnessMedium,
  SettingsOutlined,
} from '@material-ui/icons';
import {
  objCompare,
  isDetailSearch,
  handleReset,
} from '../../helpers';
import { ACCOUNT, LOGIN, ADMIN } from '../../constants/routes';
import {
  quickSearch,
  backdrop,
  darkTheme,
  filterSearch,
  navSidebar,
  routeConfig,
} from '../../constants/globalVars';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  accountButtons: { padding: '0.5rem' },
  expand: {
    [theme.breakpoints.down('xs')]: {
      transform: 'rotate(180deg)',
    },
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    [theme.breakpoints.down('xs')]: {
      transform: 'rotate(0deg)',
    },
    transform: 'rotate(180deg)',
  },
}));

const NavButtons = ({ themeSnackbar, session }) => {
  const theme = useTheme();
  const { INITIAL_SEARCH_STATE, type } = routeConfig();
  const classes = useStyles();

  return (
    <>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: filterSearch().show,
        })}
        edge="end"
        title="Advanced search"
        onClick={(event) => {
          event.stopPropagation();

          filterSearch({
            show: !filterSearch().show,
          });
          backdrop() && backdrop(false);
        }}
      >
        <ExpandMore />
      </IconButton>

      {quickSearch().show ||
      !objCompare(routeConfig().searchVar(), INITIAL_SEARCH_STATE) ? (
        <IconButton
          title="Reset search"
          onClick={(e) => {
            e.stopPropagation();
            if (
              objCompare(
                routeConfig().searchVar(),
                INITIAL_SEARCH_STATE,
              )
            ) {
              quickSearch({ show: false });
              return;
            }
            handleReset();
          }}
        >
          <Close color="secondary" />
        </IconButton>
      ) : (
        <IconButton
          id="searchButton"
          onClick={(e) => {
            e.stopPropagation();
            // Show the detailed search if we have detailed terms
            if (isDetailSearch(routeConfig().searchVar()))
              return filterSearch({ show: true });

            quickSearch({
              show: !quickSearch().show,
              autofocus: true,
            });
          }}
        >
          <Search />
        </IconButton>
      )}

      <Hidden lgUp>
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={(e) => {
            navSidebar(!navSidebar());
            e.stopPropagation();
          }}
        >
          <Menu fontSize="large" />
        </IconButton>
      </Hidden>
      <Hidden mdDown>
        <Link
          onClick={(e) => e.stopPropagation()}
          to={routeConfig().routes.post}
        >
          <Button color="primary" variant="contained">
            {type == 'job' && (
              <FormattedMessage id="navbar.post_job_button" />
            )}
            {type == 'venue' && (
              <FormattedMessage id="navbar.post_venue_button" />
            )}
          </Button>
        </Link>
        <span className={classes.accountButtons}>
          {session?.me ? (
            <Link onClick={(e) => e.stopPropagation()} to={ACCOUNT}>
              <Button color="primary" variant="outlined">
                <FormattedMessage id="navbar.account_button" />
              </Button>
            </Link>
          ) : (
            <Link onClick={(e) => e.stopPropagation()} to={LOGIN}>
              <Button color="primary" variant="outlined">
                <FormattedMessage id="common.login" />
              </Button>
            </Link>
          )}

          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              darkTheme(!darkTheme());
              themeSnackbar();
            }}
          >
            <BrightnessMedium fontSize="small" />
          </IconButton>
          {session?.me?.role === 'ADMIN' && (
            <Link to={ADMIN}>
              <IconButton>
                <SettingsOutlined fontSize="small" />
              </IconButton>
            </Link>
          )}
        </span>
      </Hidden>
    </>
  );
};

export default NavButtons;
