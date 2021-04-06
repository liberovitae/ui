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
  Grow,
  Tooltip,
  Collapse,
  ClickAwayListener,
  IconButton,
  Popper,
  Paper,
} from '@material-ui/core';
import {
  makeStyles,
  darken,
  lighten,
} from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { hero } from '../../../constants/globalVars';
import history from '../../../constants/history';
import { POST_CREATE, MY_POSTS } from '../../../constants/routes';
import {
  ExpandMore,
  Edit,
  Delete,
  Visibility,
  PostAddRounded,
} from '@material-ui/icons';
import {
  GET_MY_POSTS,
  DELETE_POST,
  GET_MY_COUNTS,
  SET_POST_STATUS,
} from './queries';
import StatusChip from './Shared/StatusChip';
import { TypeChip, Date, Avatar } from '../../Shared/Elements';
import { GET_PAGINATED_POSTS } from '../../Post/queries';
import * as ROUTE_CONFIGS from '../../../constants/routeConfig';
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
    justifyContent: 'space-between',
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

const MyPosts = React.memo(({ refetch }) => {
  const intl = useIntl();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_MY_POSTS);
  const [expanded, setExpanded] = useState(false);
  const postCount = data?.myPosts?.length;

  const [deletePost, { client }] = useMutation(DELETE_POST, {
    refetchQueries: [
      { query: GET_MY_POSTS },
      { query: GET_MY_COUNTS },
      {
        query: GET_PAGINATED_POSTS,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const handleExpandClick = (id) => {
    setExpanded((prevState) => ({ [id]: !prevState[id] }));
  };

  const [setStatus] = useMutation(SET_POST_STATUS, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    refetchQueries: [
      { query: GET_MY_POSTS },
      // {
      //   query: GET_PAGINATED_POSTS,
      //   variables: { limit: 20, cache: false },
      // },
    ],
  });

  const confirmDelete = (id) => {
    const r = window.confirm(
      intl.formatMessage({ id: 'account.posts.confirm_delete' }),
    );
    if (r === true) {
      onDelete(id);
    } else {
      return false;
    }
  };

  const onDelete = (id) => {
    deletePost({ variables: { id: id } }).then(({ data }) =>
      data.deletePost
        ? (enqueueSnackbar(
            <FormattedMessage id="account.posts.remove_success_snackbar" />,
            {
              variant: 'success',
            },
          ),
          client.cache.evict({
            id: client.cache.identify(id),
          }))
        : enqueueSnackbar(
            <FormattedMessage id="account.posts.remove_failure_snackbar" />,
            {
              variant: 'error',
            },
          ),
    );
    return true;
  };

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.posts.hero.title" />,
      subtitle: <FormattedMessage id="account.posts.hero.subtitle" />,
    });
  }, []);

  const handleClick = (newPlacement) => (e) => {
    setAnchorEl(e.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Fade in>
      <div>
        <div className={classes.description}>
          <Typography paragraph>
            <FormattedMessage id="account.posts.description" />
          </Typography>
          <Grid container align="center">
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={handleClick('right')}
                color="primary"
              >
                <FormattedMessage id="account.posts.create_new_button" />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
              >
                {({ TransitionProps }) => (
                  <ClickAwayListener
                    onClickAway={() => setOpen(false)}
                  >
                    <Grow {...TransitionProps} timeout={350}>
                      <Paper
                        elevation={3}
                        style={{
                          marginLeft: '1rem',
                        }}
                      >
                        <Grid
                          container
                          justify="center"
                          alignItems="center"
                        >
                          <Grid item xs={5}>
                            <Link to={`/venue/create`}>
                              <Button fullWidth>Venue</Button>
                            </Link>
                          </Grid>
                          <Grid
                            style={{ textAlign: 'center' }}
                            item
                            xs={1}
                          >
                            »
                          </Grid>
                          <Grid item xs={5}>
                            <Link to={'/event/create'}>
                              <Button fullWidth>Event</Button>
                            </Link>
                          </Grid>
                          <Grid item xs={5}>
                            <Link to={`/company/create`}>
                              <Button fullWidth>Company</Button>
                            </Link>
                          </Grid>
                          <Grid
                            style={{ textAlign: 'center' }}
                            item
                            xs={1}
                          >
                            »
                          </Grid>
                          <Grid item xs={5}>
                            <Link to={'/job/create'}>
                              <Button fullWidth>Job</Button>
                            </Link>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grow>
                  </ClickAwayListener>
                )}
              </Popper>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <Grid container>
          {data?.myPosts.map((post) => {
            const postCount = post?.children?.length;

            const { Icon } = ROUTE_CONFIGS[post.type];

            return (
              <Grid
                item
                onClick={() => handleExpandClick(post.id)}
                className={classes.itemControl}
                key={post.id}
              >
                <Grid item className={classes.flexContainer}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Avatar image={post.image} />
                    <Icon style={{ marginRight: '0.25rem' }} />
                    <Typography variant="h6">{post.title}</Typography>
                  </span>
                  <StatusChip type={post.type} status={post.status} />
                </Grid>

                <Grid
                  item
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <TypeChip type={post.type} text={post.types[0]} />
                  <span>
                    <IconButton
                      onClick={() => confirmDelete(post.id)}
                      color="secondary"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                    <Button
                      onClick={() =>
                        history.push(
                          `/${post.type}/create/${post.slug}`,
                        )
                      }
                      style={{
                        color: ROUTE_CONFIGS[post.type].theme.light()
                          .palette.primary.main,
                      }}
                    >
                      <Edit
                        style={{
                          marginRight: '0.3rem',
                        }}
                        fontSize="small"
                      />
                      <FormattedMessage id="common.edit" />
                    </Button>
                    <Button
                      onClick={() =>
                        history.push(`/${post.type}/${post.slug}`)
                      }
                      style={{
                        color: ROUTE_CONFIGS[post.type].theme.light()
                          .palette.primary.main,
                      }}
                    >
                      <Visibility
                        style={{
                          marginRight: '0.3rem',
                        }}
                        fontSize="small"
                      />
                      <FormattedMessage id="common.view" />
                    </Button>
                    {postCount > 0 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExpandClick(post.id);
                        }}
                      >
                        <ExpandMore
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded[post.id],
                          })}
                        />
                        {postCount} {post.children[0].type}s
                      </Button>
                    )}
                  </span>
                </Grid>

                <Collapse
                  in={expanded[post.id]}
                  timeout="auto"
                  unmountOnExit
                >
                  {post.children?.map((child) => {
                    return (
                      <Grid
                        className={classes.children}
                        onClick={() =>
                          history.push(`/${child.type}/${child.slug}`)
                        }
                        container
                        key={child.id}
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
                        <Grid sm={10} xs={8} item>
                          <Typography variant="h6">
                            {child.title}
                          </Typography>
                          {child.dates?.start && child.dates?.end && (
                            <Date listItem dates={child.dates} />
                          )}
                          <TypeChip
                            type={child.type}
                            text={child.types[0]}
                          />
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
                          <StatusChip
                            type={child.type}
                            status={child.status}
                          />
                          <br />
                          <IconButton
                            onClick={() => confirmDelete(child.id)}
                            className={classes.buttonSmall}
                          >
                            <Delete
                              fontSize="small"
                              color="secondary"
                            />
                          </IconButton>
                          <Link
                            to={`/${child.type}/create/${child.slug}`}
                          >
                            <IconButton
                              style={{
                                color: ROUTE_CONFIGS[
                                  child.type
                                ].theme.light().palette.primary.main,
                              }}
                              className={classes.buttonSmall}
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                          </Link>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Collapse>
                <Divider className={classes.divider} />
              </Grid>
            );
          })}
        </Grid>
        {!postCount && (
          <Typography align="center">
            <FormattedMessage id="account.posts.none_found" />
          </Typography>
        )}
      </div>
    </Fade>
  );
});

export default MyPosts;
