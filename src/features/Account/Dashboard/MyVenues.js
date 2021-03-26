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
import { hero } from '../../../constants/globalVars';
import history from '../../../constants/history';
import { VENUE_POST, MY_VENUES } from '../../../constants/routes';
import {
  GET_ME_VENUES,
  DELETE_VENUE,
  GET_ME_COUNTS,
  SET_VENUE_STATUS,
} from './queries';
import StatusChip from './Shared/StatusChip';
import { TypeChip } from '../../Shared/Elements';
import { GET_PAGINATED_VENUES } from '../../../constants/routeConfig/venue/queries';

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

const VenueAds = ({ refetch }) => {
  const intl = useIntl();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_ME_VENUES);

  const [deleteVenue, { client }] = useMutation(DELETE_VENUE, {
    refetchQueries: [
      { query: GET_ME_VENUES },
      { query: GET_ME_COUNTS },
      {
        query: GET_PAGINATED_VENUES,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const [setStatus] = useMutation(SET_VENUE_STATUS, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    refetchQueries: [
      { query: GET_ME_VENUES },
      {
        query: GET_PAGINATED_VENUES,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const confirmDelete = (id) => {
    const r = window.confirm(
      intl.formatMessage({ id: 'account.venues.confirm_delete' }),
    );
    if (r === true) {
      onDelete(id);
    } else {
      return false;
    }
  };

  const onDelete = (id) => {
    deleteVenue({ variables: { id: id } }).then(({ data }) =>
      data.deleteVenue
        ? (enqueueSnackbar(
            <FormattedMessage id="account.venues.remove_success_snackbar" />,
            {
              variant: 'success',
            },
          ),
          client.cache.evict({
            id: client.cache.identify(id),
          }))
        : enqueueSnackbar(
            <FormattedMessage id="account.venues.remove_failure_snackbar" />,
            {
              variant: 'error',
            },
          ),
    );
    return true;
  };

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.venues.hero.title" />,
      subtitle: (
        <FormattedMessage id="account.venues.hero.subtitle" />
      ),
    });
  }, []);

  return (
    <Fade in>
      <div>
        <div className={classes.description}>
          <Typography paragraph>
            <FormattedMessage id="account.venues.description" />
          </Typography>
          <Grid container align="center">
            <Grid item xs={6}></Grid>

            <Grid item xs={6}>
              <Link to={VENUE_POST}>
                <Button
                  variant="contained"
                  onClick={() => localStorage.removeItem('venue')}
                  color="primary"
                >
                  <FormattedMessage id="account.venues.create_new_button" />
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <Grid container>
          {data &&
            data.meVenues.map((venue) => (
              <Grid
                item
                className={classes.itemControl}
                key={venue.id}
              >
                <Grid item className={classes.flexContainer}>
                  <Typography variant="h6">{venue.title}</Typography>
                  <StatusChip status={venue.status} />
                </Grid>
                <TypeChip type={venue.types[0]} />
                <div>
                  <Button
                    onClick={() =>
                      history.push(`${VENUE_POST}/${venue.slug}`)
                    }
                    variant="outlined"
                    color="primary"
                  >
                    <FormattedMessage id="common.edit" />
                  </Button>

                  <Button
                    onClick={(event) => confirmDelete(venue.id)}
                    style={{ margin: '1rem' }}
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
        {data && !data.meVenues.length && (
          <Typography align="center">
            <FormattedMessage id="account.venues.none_found" />
          </Typography>
        )}
      </div>
    </Fade>
  );
};

export default VenueAds;
