import React from 'react';
import {
  Collapse,
  Box,
  AppBar,
  Toolbar,
  Slide,
  useScrollTrigger,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useReactiveVar } from '@apollo/client';
import { objCompare } from '../../helpers';
import { useSnackbar } from 'notistack';
import {
  quickSearch,
  filterSearch,
  backdrop,
  routeConfig,
  darkTheme,
} from '../../constants/globalVars';
import Tabs from './Tabs';
import Filter from '../Filter';
import Breadcrumbs from './Breadcrumbs';
import NavButtons from './NavButtons';
import Logo from './Logo';
import { scrollTop } from '../Shared/ScrollTop';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    boxShadow: '1px 3px 10px rgba(0, 0, 0, 0.2)',
  },
  grow: {
    flexGrow: 1,
  },
}));

const HideOnScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger({
    target: window ? window : undefined,
  });

  return (
    <Slide
      appear={false}
      direction="down"
      in={quickSearch().show || filterSearch().show || !trigger}
    >
      {children}
    </Slide>
  );
};

const Appbar = React.memo(
  ({ history, session, lastLocation }) => {
    const classes = useStyles();
    const reactiveSearch = useReactiveVar(routeConfig().searchVar);
    const reactiveFilterSearch = useReactiveVar(filterSearch);
    const { enqueueSnackbar } = useSnackbar();

    const themeSnackbar = () => {
      if (darkTheme()) {
        return enqueueSnackbar('Welcome to the dark side!', {
          variant: 'success',
        });
      }

      return enqueueSnackbar('Welcome to the bright side!', {
        variant: 'success',
      });
    };

    return (
      <HideOnScroll>
        <AppBar onClick={scrollTop} className={classes.appBar}>
          <Toolbar disableGutters>
            <Logo lastLocation={lastLocation} history={history} />

            <div className={classes.grow} />
            <Tabs history={history} />
            <div className={classes.grow} />

            <NavButtons
              session={session}
              themeSnackbar={themeSnackbar}
            />
          </Toolbar>

          <Collapse
            appear
            in={
              !filterSearch().show &&
              !objCompare(
                reactiveSearch,
                routeConfig().INITIAL_SEARCH_STATE,
              )
            }
            mountOnEnter
            unmountOnExit
            timeout="auto"
          >
            <Breadcrumbs />
          </Collapse>

          <Collapse
            appear
            in={reactiveFilterSearch.show}
            timeout="auto"
            mountOnEnter
            unmountOnExit
          >
            <Box p={1}>
              <Filter
                backdrop={backdrop}
                handleClickAway={(e) => {
                  filterSearch().show &&
                    filterSearch({ show: false });
                  backdrop(false);
                }}
              />
            </Box>
          </Collapse>
        </AppBar>
      </HideOnScroll>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.session === nextProps.session &&
      prevProps.reactiveRouteConfig ===
        nextProps.reactiveRouteConfig &&
      prevProps.reactiveSearch === nextProps.reactiveSearch
    )
      return true;
    return false;
  },
);

export default Appbar;
