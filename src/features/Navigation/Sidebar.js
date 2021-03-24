import React from 'react';
import { Link } from 'react-router-dom';
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { BrightnessMediumOutlined } from '@material-ui/icons';
import { useReactiveVar } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import { navSidebar, darkTheme } from '../../constants/globalVars';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    justifyContent: 'space-around',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  listItem: { marginTop: '0.5rem' },
  listItemText: { marginLeft: '0.5rem' },
  linkText: {
    textDecoration: `none`,
    width: '100%',
    textTransform: `uppercase`,
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.overrides.MuiCssBaseline['@global'].a.color,
    },
  },
  sideDrawer: {
    backgroundColor: theme.palette.background.default,
  },
  themeButton: {
    marginTop: '0.5rem',
    textDecoration: `none`,
    width: '100%',
    textTransform: `uppercase`,
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.overrides.MuiCssBaseline['@global'].a.color,
    },
  },
}));

const SideDrawer = ({ navLinks }) => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const reactiveSidebar = useReactiveVar(navSidebar);

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

  const sideDrawerList = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={() => navSidebar(false)}
      onKeyDown={() => navSidebar(false)}
    >
      <List component="nav">
        {navLinks.map(({ title, path, icon }) => {
          if (title)
            return (
              <Link to={path} key={path} className={classes.linkText}>
                <ListItem className={classes.listItem} button>
                  {icon}
                  <ListItemText
                    className={classes.listItemText}
                    primary={title}
                  />
                </ListItem>
              </Link>
            );
        })}
        <ListItem
          onClick={() => {
            darkTheme(!darkTheme());
            themeSnackbar();
          }}
          className={classes.themeButton}
          button
        >
          <BrightnessMediumOutlined />
          <ListItemText
            className={classes.listItemText}
            primary={darkTheme() ? 'Light theme' : 'Dark theme'}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      anchor="right"
      PaperProps={{ className: classes.sideDrawer }}
      open={reactiveSidebar}
      onOpen={() => navSidebar(true)}
      onClose={() => navSidebar(false)}
    >
      {sideDrawerList('right')}
    </SwipeableDrawer>
  );
};

export default SideDrawer;
