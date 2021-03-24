import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import {
  Typography,
  Button,
  Grid,
  Divider,
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import history from '../../../constants/history';
import { JOB_POST, COMPANY_EDIT } from '../../../constants/routes';
import {
  GET_ME_JOBS,
  DELETE_JOB,
  GET_ME_COUNTS,
  SET_JOB_STATUS,
} from './queries';
import StatusChip from './Shared/StatusChip';
import { TypeChip } from '../../Shared/Elements';
import { GET_PAGINATED_JOBS } from '../../Job/queries';
import { hero } from '../../../constants/globalVars';

const useStyles = makeStyles((theme) => ({
  itemControl: {
    width: '100%',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: '1rem',
    width: '100%',
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(3),
  },
  typesChip: {
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#999',
    margin: '0.5rem',
  },
}));

const JobAds = ({}) => {
  const intl = useIntl();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { data, loading, error } = useQuery(GET_ME_JOBS);

  const [deleteJob, { client }] = useMutation(DELETE_JOB, {
    refetchQueries: [
      { query: GET_ME_JOBS },
      { query: GET_ME_COUNTS },
      {
        query: GET_PAGINATED_JOBS,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const [setStatus] = useMutation(SET_JOB_STATUS, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    refetchQueries: [
      { query: GET_ME_JOBS },
      {
        query: GET_PAGINATED_JOBS,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const confirmDelete = (id) => {
    const r = window.confirm(
      intl.formatMessage({ id: 'account.job_ads.confirm_delete' }),
    );
    if (r === true) {
      onDelete(id);
    } else {
      return;
    }
  };

  const onDelete = (id) => {
    deleteJob({ variables: { id: id } }).then((res) =>
      res.data.deleteJob
        ? (enqueueSnackbar(
            <FormattedMessage id="account.job_ads.remove_success_snackbar" />,
            {
              variant: 'success',
            },
          ),
          client.cache.evict({
            id: client.cache.identify(id),
          }))
        : enqueueSnackbar(
            <FormattedMessage id="account.job_ads.remove_failure_snackbar" />,
            {
              variant: 'error',
            },
          ),
    );
    return true;
  };

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.job_ads.hero.title" />,
      subtitle: (
        <FormattedMessage id="account.job_ads.hero.subtitle" />
      ),
    });
  }, []);

  return (
    <Fade in>
      <div>
        <div className={classes.description}>
          <Typography paragraph>
            <FormattedMessage id="account.job_ads.description" />
          </Typography>
          <Grid container align="center">
            <Grid item xs={6}>
              <Link to={COMPANY_EDIT}>
                <Button
                  color="primary"
                  variant="outlined"
                  className={classes.menuButton}
                >
                  <FormattedMessage id="account.job_ads.company_button" />
                </Button>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Link to={JOB_POST}>
                <Button
                  variant="contained"
                  onClick={() => localStorage.removeItem('job')}
                  color="primary"
                >
                  <FormattedMessage id="account.job_ads.create_new_button" />
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <Grid container>
          {data &&
            data.meJobs.map((job) => (
              <Grid item className={classes.itemControl} key={job.id}>
                <Grid item className={classes.flexContainer}>
                  <Typography variant="h6">{job.title}</Typography>
                  <StatusChip status={job.status} />
                </Grid>
                <TypeChip type={job.types[0]} />
                <div>
                  <Button
                    onClick={() =>
                      history.push(`${JOB_POST}/${job.slug}`)
                    }
                    disabled={job.status === 'filled'}
                    variant="outlined"
                    color="primary"
                  >
                    <FormattedMessage id="common.edit" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setStatus({
                        variables: {
                          id: job.id,
                          status:
                            job.status === 'filled'
                              ? 'published'
                              : 'filled',
                        },
                      });
                    }}
                    style={{ margin: '1rem' }}
                    variant="outlined"
                    disabled={job.status === 'draft'}
                    color="primary"
                  >
                    {job.status === 'filled' ? (
                      <FormattedMessage id="common.unmark" />
                    ) : (
                      <FormattedMessage id="common.mark" />
                    )}{' '}
                    <FormattedMessage id="common.filled" />
                  </Button>

                  <Button
                    onClick={(event) => confirmDelete(job.id)}
                    variant="outlined"
                    color="secondary"
                  >
                    <FormattedMessage id="common.delete" />
                  </Button>
                </div>
                <Divider className={classes.divider} />
              </Grid>
            ))}
        </Grid>
        {!data?.meJobs?.length && (
          <Typography align="center">
            <FormattedMessage id="account.job_ads.none_found" />
          </Typography>
        )}
      </div>
    </Fade>
  );
};

export default JobAds;
