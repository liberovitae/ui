import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/client';
import { Button, Grid, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  ACCOUNT,
  MY_JOBS,
  SAVED,
  SETTINGS,
  MY_VENUES,
  ALERTS,
} from '../../../constants/routes';
import { GET_ME_COUNTS } from './queries';
import LogoutButton from '../Logout';

const AccountMenu = () => {
  const { data } = useQuery(GET_ME_COUNTS);
  const matches = useMediaQuery('(min-width:960px)');

  const useStyles = makeStyles((theme) => ({
    badge: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    menuButton: {
      margin: theme.spacing(1),
      fontSize: '1rem',
      color: '#666',
      width: matches ? '100%' : 'unset',
      justifyContent: 'start',
      margin: matches ? 0 : '0.2rem',
      '&:hover': {
        backgroundColor: '#f9f9f9',
      },
    },
    menu: {
      width: '100%',
      display: matches ? 'block' : 'flex',
      margin: matches ? 'unset' : 'auto',
      flexFlow: matches ? 'unset' : 'wrap',
      justifyContent: 'space-around',
      marginTop: '2rem',
    },
  }));

  const classes = useStyles();

  return (
    <Grid item md={3} className={classes.menu}>
      <Link to={ACCOUNT}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="account.menu.dashboard" />
        </Button>
      </Link>

      <Link to={ALERTS}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="account.menu.alerts" />
          {data?.meCounts?.alerts?.jobs +
            data?.meCounts?.alerts?.venues >
            0 && (
            <Badge
              // showZero
              className={classes.badge}
              color="primary"
              badgeContent={
                data?.meCounts?.alerts?.jobs +
                  data?.meCounts?.alerts?.venues || 0
              }
            />
          )}
        </Button>
      </Link>

      <Link to={MY_JOBS}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="account.menu.jobs" />
          {data?.meCounts?.jobs > 0 && (
            <Badge
              // showZero
              className={classes.badge}
              color="primary"
              badgeContent={data?.meCounts?.jobs || 0}
            />
          )}
        </Button>
      </Link>

      <Link to={MY_VENUES}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="account.menu.venues" />

          {data?.meCounts?.venues > 0 && (
            <Badge
              // showZero
              className={classes.badge}
              color="primary"
              badgeContent={data?.meCounts?.venues || 0}
            />
          )}
        </Button>
      </Link>

      <Link to={SAVED}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="account.menu.saved" />
          {data?.meCounts?.saved?.jobs +
            data?.meCounts?.saved?.venues >
            0 && (
            <Badge
              // showZero
              className={classes.badge}
              color="primary"
              badgeContent={
                data?.meCounts?.saved?.jobs +
                  data?.meCounts?.saved?.venues || 0
              }
            />
          )}
        </Button>
      </Link>

      <Link to={SETTINGS}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="account.menu.settings" />
        </Button>
      </Link>

      <LogoutButton />
    </Grid>
  );
};

export default AccountMenu;
