import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ApolloConsumer } from '@apollo/client';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';
import { LANDING } from '../../../constants/routes';
import history from '../../../constants/history';

const Logout = (client) => {
  // localStorage.removeItem('token');
  localStorage.clear();
  sessionStorage.clear();
  client.resetStore();
  history.push(LANDING);
};

const LogoutButton = () => {
  const matches = useMediaQuery('(min-width:960px)');

  const useStyles = makeStyles((theme) => ({
    menuButton: {
      margin: '1rem',
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

  const { enqueueSnackbar } = useSnackbar();
  return (
    <ApolloConsumer>
      {(client) => (
        <Button
          className={classes.menuButton}
          onClick={() => Logout(client)}
        >
          <FormattedMessage id="common.logout" />
        </Button>
      )}
    </ApolloConsumer>
  );
};

export { Logout };

export default LogoutButton;
