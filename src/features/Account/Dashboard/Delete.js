import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { ApolloConsumer, useMutation } from '@apollo/client';
import { Typography, Button, Grid, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LANDING, SETTINGS } from '../../../constants/routes';
import history from '../../../constants/history';
import withAuthorization from '../../Session/withAuthorization';
import { useSnackbar } from 'notistack';
import { DELETE_USER } from './queries';
import { hero } from '../../../constants/globalVars';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
    width: '100%',
  },
  description: {
    marginBottom: theme.spacing(6),
  },
}));

const DeleteAccount = ({ session }) => {
  const classes = useStyles();
  const [deleteUser] = useMutation(DELETE_USER);

  const { enqueueSnackbar } = useSnackbar();

  const Logout = (client) => {
    localStorage.clear();
    client.resetStore();
    enqueueSnackbar(
      <FormattedMessage id="account.delete.success_snackbar" />,
      {
        variant: 'success',
      },
    );
    history.push(LANDING);
  };

  const intl = useIntl();

  const onUserDelete = (id, client) => {
    const r = window.confirm(
      intl.formatMessage({ id: 'account.delete.confirm_text' }),
    );
    if (r === true) {
      deleteUser({ variables: { id: id } });
      Logout(client);
    } else {
      return;
    }
  };

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.delete.hero.title" />,
      subtitle: (
        <FormattedMessage id="account.delete.hero.subtitle" />
      ),
    });
  }, []);

  return (
    <Fade in>
      <Grid container justify="center" spacing={3}>
        <Grid item className={classes.description}>
          <Typography align="center" paragraph gutterBottom>
            <FormattedMessage id="account.delete.description" />
          </Typography>
        </Grid>
        <Grid item xs={12} md={10}>
          <ApolloConsumer>
            {(client) => (
              <Button
                className={classes.button}
                onClick={() => onUserDelete(session.me.id, client)}
                color="secondary"
                variant="contained"
              >
                <FormattedMessage id="account.delete.confirm_button" />
              </Button>
            )}
          </ApolloConsumer>
        </Grid>
        <Grid item xs={12} md={10}>
          <Link to={SETTINGS}>
            <Button
              className={classes.button}
              color="primary"
              variant="outlined"
            >
              <FormattedMessage id="account.delete.back_button" />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default withAuthorization((session) => session && session.me)(
  DeleteAccount,
);
