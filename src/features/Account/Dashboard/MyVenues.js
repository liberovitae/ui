import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import clsx from 'clsx';
import {
  Typography,
  Button,
  Grid,
  Divider,
  Fade,
  Tooltip,
  Collapse,
  IconButton,
} from '@material-ui/core';
import {
  makeStyles,
  darken,
  lighten,
} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { hero } from '../../../constants/globalVars';
import history from '../../../constants/history';
import {
  VENUE_POST,
  MY_VENUES,
  EVENT_POST,
} from '../../../constants/routes';
import {
  ExpandMore,
  Edit,
  Delete,
  Visibility,
} from '@material-ui/icons';
import {
  GET_ME_VENUES,
  DELETE_VENUE,
  DELETE_EVENT,
  GET_ME_COUNTS,
  GET_ME_EVENTS,
  SET_VENUE_STATUS,
} from './queries';
import StatusChip from './Shared/StatusChip';
import { TypeChip, Date, Avatar } from '../../Shared/Elements';
import { GET_PAGINATED_VENUES } from '../../../constants/routeConfig/venue/queries';
import { GET_PAGINATED_EVENTS } from '../../../constants/routeConfig/event/queries';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

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
    marginTop: theme.spacing(1),
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  children: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.palette.type === 'dark'
          ? lighten(theme.palette.background.default, 0.08)
          : darken(theme.palette.background.default, 0.02),
    },
  },
  timeline: {
    marginTop: '0.2rem',
    marginRight: '0.2rem',

    '&::before': {
      padding: 0,
      marginLeft: '0.5rem',
    },
  },
}));

const VenueAds = React.memo(({ refetch }) => {
  const intl = useIntl();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_ME_VENUES);
  const [expanded, setExpanded] = useState(false);

  const venueCount = data?.meVenues?.length;

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

  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: [
      { query: GET_ME_EVENTS },
      { query: GET_ME_VENUES },
      {
        query: GET_PAGINATED_EVENTS,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const handleExpandClick = (id) => {
    setExpanded((prevState) => ({ [id]: !prevState[id] }));
  };

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

  const confirmEventDelete = (id) => {
    const r = window.confirm(
      intl.formatMessage({ id: 'account.events.confirm_delete' }),
    );
    if (r === true) {
      onEventDelete(id);
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

  const onEventDelete = (id) => {
    deleteEvent({ variables: { id: id } }).then(({ data }) =>
      data.deleteEvent
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
            <Grid item xs={6}>
              <Tooltip
                title={
                  !venueCount
                    ? 'Create your first venue in order to create an event'
                    : ''
                }
              >
                <Link to={venueCount ? EVENT_POST : '#'}>
                  <Button
                    disabled={!venueCount}
                    variant="outlined"
                    onClick={() => localStorage.removeItem('venue')}
                    color="primary"
                  >
                    <FormattedMessage id="account.events.create_new_button" />
                  </Button>
                </Link>
              </Tooltip>
            </Grid>

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
          {data?.meVenues.map((venue) => {
            const eventCount = venue?.children?.length;

            return (
              <Grid
                item
                className={classes.itemControl}
                key={venue.id}
              >
                <Grid item className={classes.flexContainer}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Avatar image={venue.image} />
                    <Typography variant="h6">
                      {venue.title}
                    </Typography>
                  </span>
                  <StatusChip status={venue.status} />
                </Grid>

                <Grid
                  item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TypeChip type={venue.types[0]} />
                  <span>
                    <IconButton
                      onClick={() => confirmDelete(venue.id)}
                      color="secondary"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    <Button
                      onClick={() =>
                        history.push(`${VENUE_POST}/${venue.slug}`)
                      }
                      color="primary"
                    >
                      <Edit
                        style={{ marginRight: '0.3rem' }}
                        fontSize="small"
                      />
                      <FormattedMessage id="common.edit" />
                    </Button>
                    {eventCount > 0 && (
                      <Button
                        onClick={() => handleExpandClick(venue.id)}
                        style={{ marginRight: '1rem' }}
                      >
                        <ExpandMore
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded[venue.id],
                          })}
                        />
                        {eventCount} events
                      </Button>
                    )}
                  </span>
                </Grid>
                <Divider className={classes.divider} />
                <Collapse
                  in={expanded[venue.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  {venue.children.map((event) => (
                    <Grid
                      className={classes.children}
                      onClick={() =>
                        history.push(`/event/${event.slug}`)
                      }
                      container
                      key={event.id}
                    >
                      <TimelineItem className={classes.timeline}>
                        <TimelineSeparator>
                          <TimelineDot
                            variant="outlined"
                            color="primary"
                          />
                          <TimelineConnector />
                        </TimelineSeparator>
                      </TimelineItem>
                      <Grid
                        style={{
                          paddingLeft: '0.5rem',
                        }}
                        sm={10}
                        xs={8}
                        item
                      >
                        <Typography variant="h6">
                          {event.title}
                        </Typography>
                        <Date listItem dates={event.dates} />
                        <TypeChip type={event.types[0]} />
                      </Grid>

                      <Grid
                        onClick={(e) => e.stopPropagation()}
                        sm={1}
                        xs={1}
                        item
                        style={{
                          display: 'inline-table',
                          textAlign: 'right',
                        }}
                      >
                        <StatusChip status={event.status} />
                        <br />
                        <IconButton
                          onClick={() => confirmEventDelete(event.id)}
                          className={classes.buttonSmall}
                        >
                          <Delete
                            fontSize="small"
                            color="secondary"
                          />
                        </IconButton>
                        <Link to={`/event/post/${event.slug}`}>
                          <IconButton className={classes.buttonSmall}>
                            <Edit fontSize="small" />
                          </IconButton>
                        </Link>
                      </Grid>
                    </Grid>
                  ))}
                </Collapse>
              </Grid>
            );
          })}
        </Grid>
        {!venueCount && (
          <Typography align="center">
            <FormattedMessage id="account.venues.none_found" />
          </Typography>
        )}
      </div>
    </Fade>
  );
});

export default VenueAds;
