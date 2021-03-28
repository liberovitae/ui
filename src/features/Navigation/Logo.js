import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { scrollTop } from '../Shared/ScrollTop';
import {
  contentDrawer,
  routeConfig,
} from '../../constants/globalVars';
import { ReactComponent as Logo } from '../../logo.svg';
import { getQueryString } from '../../helpers';

const useStyles = makeStyles((theme) => ({
  logo: {
    [theme.breakpoints.down('xs')]: {
      width: '30px',
      marginTop: '8px',
    },
    height: '20px',
    width: '60px',
    display: 'inline',
    marginRight: '0.5rem',
  },
  logoContainer: {
    marginLeft: '1rem',
    cursor: 'pointer',
  },
}));

const NavLogo = ({ history, lastLocation }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();

        if (contentDrawer().show) {
          return history.goBack();
        }

        if (
          history.location.pathname ===
            routeConfig().routes.landing ||
          window.location.pathname === routeConfig().routes.landing
        )
          return scrollTop();

        if (!lastLocation) {
          return history.push(routeConfig().routes.landing);
        }

        if (
          lastLocation?.pathname !== routeConfig().routes.landing &&
          history.location.pathname !== routeConfig().routes.landing
        )
          return history.push({
            pathname: routeConfig().routes.landing,
            search: getQueryString(routeConfig().searchVar()),
          });

        history.goBack();
      }}
      className={classes.logoContainer}
    >
      <Logo
        fill={theme.palette.primary.main}
        className={classes.logo}
      />
    </span>
  );
};

export default NavLogo;
