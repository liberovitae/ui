import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Button,
  Grid,
  Divider,
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MailOutline,
  WorkOutlineOutlined,
  HomeWorkOutlined,
  EventOutlined,
} from '@material-ui/icons';
import { useQuery, useMutation } from '@apollo/client';
import { SAVED } from '../../../constants/routes';
import {
  GET_SAVED_POSTS,
  DELETE_SAVED_POST,
  GET_MY_COUNTS,
} from './queries';
import { hero } from '../../../constants/globalVars';
import * as ROUTE_CONFIGS from '../../../constants/routeConfig';

const useStyles = makeStyles((theme) => ({
  textValidation: {
    width: '100%',
  },
  listItem: {
    display: 'inline-grid',
  },
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    verticalAlign: 'sub',
  },
  listIcon: {
    marginRight: '0.3em',
    verticalAlign: 'sub',
  },
  divider: {
    margin: theme.spacing(1),
  },
  notFoundText: {
    padding: '2rem',
  },
}));

const SavedPosts = ({ session }) => {
  const classes = useStyles();
  const intl = useIntl();

  const { data, loading, error } = useQuery(GET_SAVED_POSTS);

  const [deleteSavedPost] = useMutation(DELETE_SAVED_POST, {
    refetchQueries: [
      { query: GET_SAVED_POSTS },
      { query: GET_MY_COUNTS },
    ],
  });

  const { enqueueSnackbar } = useSnackbar();

  function confirmDelete(id, savedItem, itemType) {
    const r = window.confirm(
      intl.formatMessage({
        id: 'account.saved.confirm_delete',
      }),
    );
    if (r === true) {
      onSavedDelete(id);
    } else {
      return;
    }
  }

  const onSavedDelete = (id) => {
    deleteSavedItem({
      variables: { id: id },
    }).then((res) =>
      res.data.deleteSavedItem
        ? enqueueSnackbar(
            <FormattedMessage id="account.saved.remove_success_snackbar" />,
            {
              variant: 'success',
            },
          )
        : enqueueSnackbar(
            <FormattedMessage id="account.saved.remove_failure_snackbar" />,
            {
              variant: 'error',
            },
          ),
    );
    return true;
  };

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.saved.hero.title" />,
      subtitle: <FormattedMessage id="account.saved.hero.subtitle" />,
    });
  }, []);

  if (data) {
    const { savedPosts } = data;

    return (
      <Fade in>
        <div>
          <Typography paragraph>
            <FormattedMessage
              id="account.saved.description"
              values={{
                email: <strong>{session.me.email}</strong>,
                icon: (
                  <MailOutline
                    fontSize="small"
                    className={classes.icon}
                  />
                ),
                jobIcon: (
                  <WorkOutlineOutlined
                    className={classes.icon}
                    fontSize="small"
                  />
                ),
                venueIcon: (
                  <HomeWorkOutlined
                    className={classes.icon}
                    fontSize="small"
                  />
                ),
                eventIcon: (
                  <EventOutlined
                    className={classes.icon}
                    fontSize="small"
                  />
                ),
              }}
            />
          </Typography>
          <Divider className={classes.divider} />
          <Grid container>
            {savedPosts?.map(({ post }) => {
              const { Icon } = ROUTE_CONFIGS[post.type];
              return (
                <Grid item xs={12} key={post.id}>
                  <Typography variant="h6">
                    <Icon className={classes.listIcon} />

                    {post.title}
                    {post.parent && ' @ ' + post.parent.title}
                    {post.reminder && (
                      <MailOutline className={classes.listIcon} />
                    )}
                  </Typography>

                  <div>
                    <Link to={`/${post.type}/${post.slug}`}>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        style={{
                          color: ROUTE_CONFIGS[
                            post.type
                          ].theme.light().palette.primary.main,
                        }}
                      >
                        <FormattedMessage id="account.saved.view_post_button" />
                      </Button>
                    </Link>
                    <Link
                      onClick={() =>
                        confirmDelete(post.id, post.title, key)
                      }
                      to={SAVED}
                    >
                      <Button variant="outlined" color="secondary">
                        <FormattedMessage id="common.delete" />
                      </Button>
                    </Link>
                  </div>
                  <Divider className={classes.divider} />
                </Grid>
              );
            })}
          </Grid>
          {/* {!combinedItems?.length && (
          <Typography
            align="center"
            paragraph
            className={classes.notFoundText}
          >
            <FormattedMessage id="account.saved.not_found" />
          </Typography>
        )} */}
        </div>
      </Fade>
    );
  }
  return '';
};

export default SavedPosts;