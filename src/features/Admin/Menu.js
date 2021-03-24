import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  ADMIN,
  ADMIN_BLOGS,
  ADMIN_USERS,
} from '../../constants/routes';

const AdminMenu = () => {
  const matches = useMediaQuery('(min-width:960px)');

  const useStyles = makeStyles((theme) => ({
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
  }));

  const classes = useStyles();

  return (
    <Grid
      item
      md={3}
      style={{
        width: '100%',
        display: matches ? 'block' : 'flex',
        margin: matches ? 'unset' : 'auto',
        flexFlow: matches ? 'unset' : 'wrap',
        justifyContent: 'space-around',
        marginTop: '2rem',
      }}
    >
      <Link to={ADMIN}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="admin.menu.dashboard" />
        </Button>
      </Link>
      <Link to={ADMIN_BLOGS}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="admin.menu.blogs" />
        </Button>
      </Link>

      <Link to={ADMIN_USERS}>
        <Button className={classes.menuButton}>
          <FormattedMessage id="admin.menu.users" />
        </Button>
      </Link>
    </Grid>
  );
};

export default AdminMenu;
