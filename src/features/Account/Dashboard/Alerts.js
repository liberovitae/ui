import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import {
  Typography,
  Button,
  Grid,
  Divider,
  Fade,
} from '@material-ui/core';
import {
  WorkOutlineOutlined,
  HomeWorkOutlined,
} from '@material-ui/icons';
import { hero } from '../../../constants/globalVars';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_ALERTS,
  DELETE_ALERT,
  GET_ME_COUNTS,
  TOGGLE_ACTIVATE,
} from './queries';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  alignRight: { textAlign: 'right' },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  icon: {
    verticalAlign: 'sub',
  },
  listIcon: {
    verticalAlign: 'sub',
    marginRight: '0.3rem',
  },
  alertFrequency: {
    textTransform: 'capitalize',
  },
}));

const Alerts = ({ refetch, session }) => {
  const intl = useIntl();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { data, loading, error } = useQuery(GET_ALERTS);

  const [deleteAlert] = useMutation(DELETE_ALERT, {
    refetchQueries: [{ query: GET_ALERTS }, { query: GET_ME_COUNTS }],
    onCompleted: (data) =>
      data.deleteAlert
        ? enqueueSnackbar(
            <FormattedMessage id="alerts.delete.success_snackbar" />,
            {
              variant: 'success',
            },
          )
        : enqueueSnackbar(
            <FormattedMessage id="alerts.delete.failure_snackbar" />,
            {
              variant: 'error',
            },
          ),
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  const [toggleActivate] = useMutation(TOGGLE_ACTIVATE, {
    refetchQueries: [{ query: GET_ALERTS }],
    onCompleted: (data) => {
      data.toggleActivate
        ? enqueueSnackbar(
            <FormattedMessage id="alerts.activate.success_snackbar" />,
            {
              variant: 'success',
            },
          )
        : enqueueSnackbar(
            <FormattedMessage id="alerts.deactivate.success_snackbar" />,
            {
              variant: 'success',
            },
          );
      refetch();
    },
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  function confirmDelete(id) {
    const r = window.confirm(
      intl.formatMessage({ id: 'alerts.confirm_delete' }),
    );
    if (r === true) {
      deleteAlert({ variables: { id: id } });
    } else {
      return;
    }
  }

  useEffect(() => {
    hero({
      title: <FormattedMessage id="alerts.hero.title" />,
      subtitle: <FormattedMessage id="alerts.hero.subtitle" />,
    });
  }, []);

  let combinedItems;

  if (data) {
    combinedItems = [...data?.alerts?.jobs, ...data?.alerts?.venues];

    combinedItems = combinedItems.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
    });
  }

  return (
    <Fade in>
      <div>
        <div className={classes.description}>
          <Typography paragraph>
            <FormattedMessage
              id="alerts.description"
              values={{
                venueIcon: (
                  <HomeWorkOutlined
                    fontSize="small"
                    className={classes.icon}
                  />
                ),
                jobIcon: (
                  <WorkOutlineOutlined
                    fontSize="small"
                    className={classes.icon}
                  />
                ),
              }}
            />{' '}
            <strong>{session.me.email}</strong>{' '}
          </Typography>

          <Link to={'/alert/post'}>
            <Button variant="outlined" color="primary">
              <FormattedMessage id="alerts.create_button" />
            </Button>
          </Link>
        </div>
        <Divider className={classes.divider} />

        {combinedItems?.map((alert) => (
          <Grid container key={alert.id} spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6" gutterBottom>
                {alert.alertType === 'venue' && (
                  <HomeWorkOutlined className={classes.listIcon} />
                )}
                {alert.alertType === 'job' && (
                  <WorkOutlineOutlined className={classes.listIcon} />
                )}
                {alert.name}
              </Typography>
            </Grid>
            <Grid item className={classes.alignRight} xs={8}>
              <Link
                to={{
                  pathname: `/alert/view/${alert.slug}`,
                  state: { search: true },
                }}
              >
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                >
                  <FormattedMessage id="alerts.show_results_button" />
                </Button>
              </Link>
              <Link to={`/alert/post/${alert.slug}`}>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                >
                  <FormattedMessage id="alerts.edit_button" />
                </Button>
              </Link>
              <Button
                onClick={() =>
                  toggleActivate({ variables: { id: alert.id } })
                }
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                {alert.active ? (
                  <FormattedMessage id="alerts.deactivate_button" />
                ) : (
                  <FormattedMessage id="alerts.activate_button" />
                )}
              </Button>
              <Button
                onClick={() => confirmDelete(alert.id)}
                className={classes.button}
                variant="outlined"
                color="secondary"
              >
                <FormattedMessage id="alerts.delete_button" />
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Typography>
                <FormattedMessage id="alerts.status" />:{' '}
                <strong>
                  {alert.active ? (
                    <FormattedMessage id="alerts.active" />
                  ) : (
                    <FormattedMessage id="alerts.inactive" />
                  )}
                </strong>
              </Typography>
            </Grid>
            <Grid className={classes.flexEnd} item xs={8}>
              <Typography>
                <FormattedMessage id="alerts.frequency" />:{' '}
                <strong className={classes.alertFrequency}>
                  {alert.frequency}
                </strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
          </Grid>
        ))}

        {!combinedItems?.length && (
          <Typography align="center">
            <FormattedMessage id="alerts.none_found" />
          </Typography>
        )}
      </div>
    </Fade>
  );
};

export default Alerts;
