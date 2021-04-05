import React, { useState, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useMutation, useReactiveVar } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Button, Box, Paper, Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import withAuthorization from '../../Session/withAuthorization';
import { routeConfig, hero } from '../../../constants/globalVars';
import PostListItem from '../PostListItem';
import PostDetail from '../PostDetail';
import { POST_CREATE, MY_POSTS } from '../../../constants/routes';
import {
  CREATE_POST,
  GET_PAGINATED_POSTS,
  UPDATE_POST,
} from '../queries';
import {
  GET_MY_COUNTS,
  GET_MY_POSTS,
} from '../../Account/Dashboard/queries';
import Loading from '../../Shared/Loading';
import { scrollTop } from '../../Shared/ScrollTop';
import INITIAL_SEARCH_STATE from '../../../constants/initialSearch';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: theme.palette.type === 'dark' ? '1px solid #333' : null,
    backgroundColor: theme.palette.background.default,
  },
  buttons: {
    display: 'flex',
  },
  publishButton: {
    textAlign: 'right',
  },
}));

const PostPreview = ({ refetch, session, history }) => {
  const classes = useStyles();
  const intl = useIntl();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { enqueueSnackbar } = useSnackbar();
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const { type } = reactiveRouteConfig;

  const [state, setState] = useState({
    post: JSON.parse(localStorage.getItem(type)), // Get draft from localStorage and apply to state
  });

  const onSubmit = (e, mutatePost, status) => {
    e.preventDefault();

    delete post.location.__typename; // Remove typename to match our Schema

    let variables = {
      id: post.id,
      input: {
        type,
        title: post.title,
        location: post.location,
        parent: post.parent,
        text: post.text,
        url: post.url,
        types: post.types,
        tags: post.tags,
        image: post.image,
        status: status,
        commentsEnabled: post.commentsEnabled,
      },
    };

    if (reactiveRouteConfig.hasDates) {
      variables.input.dates = post.dates;
    }

    // Remove typenames from our inputs
    delete post.__typename;
    delete post.dates.__typename;

    mutatePost({
      variables: variables,
    }).then((data) => {
      console.log(data);
      if (data && Object.values(data)[0]) {
        localStorage.removeItem(type);
        sessionStorage.removeItem(type);
        if (Object.values(data)[0].status === 'draft') {
          enqueueSnackbar(
            intl.formatMessage(
              {
                id: 'preview.draft_save.success_snackbar',
              },
              { type: type },
            ),
            {
              variant: 'success',
            },
          );
          return history.push(MY_POSTS);
        }

        enqueueSnackbar(
          intl.formatMessage(
            {
              id: 'preview.publish.success_snackbar',
            },
            { type: type },
          ),
          {
            variant: 'success',
          },
        );
        refetch();
        scrollTop();
        return history.push({
          pathname: reactiveRouteConfig.routes.landing,
        });
      }
    });
  };

  useEffect(() => {
    hero({
      title: intl.formatMessage(
        { id: 'preview.hero.title' },
        { type },
      ),

      subtitle: intl.formatMessage(
        { id: 'preview.hero.subtitle' },
        { type },
      ),
    });
    scrollTop();
  }, []);

  const { post } = state;

  const [mutatePost, { data, loading, error, client }] = useMutation(
    post && !post.id ? CREATE_POST : UPDATE_POST,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: GET_PAGINATED_POSTS,
          variables: {
            type,
            limit: 20,
            cache: false,
            filter: INITIAL_SEARCH_STATE,
          },
        },
        { query: GET_MY_COUNTS, variables: { type } },
        { query: GET_MY_POSTS, variables: { type } },
      ],
      onError: (err) =>
        enqueueSnackbar(err.message, { variant: 'error' }),
      onCompleted: () => {
        client.cache.evict({
          id: client.cache.identify(post.id),
        });

        client.cache.gc();
      },
    },
  );

  if (loading) {
    return <Loading />;
  }

  if (post) {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={6} sm={3}>
            <Link to={POST_CREATE}>
              <Button variant="outlined">
                <FormattedMessage
                  id="preview.edit_post_button"
                  values={{ type }}
                />
              </Button>
            </Link>
          </Grid>
          <Grid
            style={{ textAlign: matches ? 'right' : null }}
            item
            xs={6}
            sm={3}
          ></Grid>
          <Grid
            style={{ textAlign: matches ? 'left' : 'right' }}
            item
            xs={6}
            sm={3}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) =>
                onSubmit(event, mutatePost, 'draft')
              }
            >
              <FormattedMessage id="preview.save_draft_button" />
            </Button>
          </Grid>
          <Grid className={classes.publishButton} item xs={6} sm={3}>
            <Button
              onClick={(event) =>
                onSubmit(event, mutatePost, 'published')
              }
              variant="contained"
              color="primary"
              type="submit"
            >
              <FormattedMessage id="preview.publish_button" />
            </Button>
          </Grid>
        </Grid>
        <Box p={6} textAlign="center">
          <FormattedMessage id="preview.frontpage_text" />
        </Box>

        <Paper className={classes.paper} elevation={6}>
          <Box p={2}>
            <PostListItem preview post={post} session={session} />
          </Box>
        </Paper>

        <Box p={6} textAlign="center">
          <FormattedMessage
            id="preview.detail_text"
            values={{ type }}
          />
        </Box>

        <Paper className={classes.paper} elevation={6}>
          <Box p={2}>
            <PostDetail
              session={session}
              type={type}
              preview
              post={post}
            />
          </Box>
        </Paper>

        <Box p={6} textAlign="center">
          <FormattedMessage id="preview.confirm_text" />
        </Box>
        <Grid
          container
          direction="row"
          justify="space-between"
          spacing={2}
          align="right"
        >
          <Grid className={classes.buttons} item sm={4}>
            <Link
              to={
                post.slug
                  ? `/${type}/create/${post.slug}`
                  : `/${type}/create`
              }
            >
              <Button variant="outlined">
                <FormattedMessage id="preview.change_button" />
              </Button>
            </Link>
          </Grid>
          <Grid item sm={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => onSubmit(e, mutatePost, 'draft')}
            >
              <FormattedMessage id="preview.save_draft_button" />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              onClick={(e) => onSubmit(e, mutatePost, 'published')}
              variant="contained"
              color="primary"
              style={{ width: matches ? '100%' : null }}
              type="submit"
            >
              <FormattedMessage id="preview.publish_button" />
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default withAuthorization((session) => session && session.me)(
  PostPreview,
);
