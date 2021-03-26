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
import ItemListItem from '../ItemListItem';
import ItemDetail from '../ItemDetail';
import { GET_ME_COUNTS } from '../../Account/Dashboard/queries';
import Loading from '../../Shared/Loading';
import { scrollTop } from '../../Shared/ScrollTop';

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

const ItemPreview = ({ refetch, session, history }) => {
  const classes = useStyles();
  const intl = useIntl();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const { enqueueSnackbar } = useSnackbar();
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const { type } = reactiveRouteConfig;

  const [state, setState] = useState({
    item: JSON.parse(localStorage.getItem(type)), // Get draft from localStorage and apply to state
  });

  const onSubmit = (event, mutateItem, status) => {
    event.preventDefault();

    delete item.location.__typename; // Remove typename to match our Schema

    mutateItem({
      variables: {
        id: item.id,
        input: {
          title: item.title,
          location: item.location,
          description: item.description,
          url: item.url,
          types: item.types,
          tags: item.tags,
          logo: item.logo,
          status: status,
        },
      },
    }).then(({ data }) => {
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
          return history.push({
            pathname: reactiveRouteConfig.routes.myListings,
          });
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
          state: { noScroll: true },
        });
      }
    });
  };

  useEffect(() => {
    hero({
      title: intl.formatMessage(
        { id: 'preview.hero.title' },
        { type: type },
      ),

      subtitle: intl.formatMessage(
        { id: 'preview.hero.subtitle' },
        { type: type },
      ),
    });
    scrollTop();
  }, []);

  const { item } = state;

  const [mutateItem, { data, loading, error, client }] = useMutation(
    item && !item.id
      ? reactiveRouteConfig.queries.create
      : reactiveRouteConfig.queries.update,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: reactiveRouteConfig.queries.getPaginated,
          variables: {
            limit: 20,
            cache: false,
            filter: reactiveRouteConfig.INITIAL_SEARCH_STATE,
          },
        },
        { query: GET_ME_COUNTS },
        { query: reactiveRouteConfig.queries.myListings },
      ],
      onError: (err) =>
        enqueueSnackbar(err.message, { variant: 'error' }),
      onCompleted: () => {
        client.cache.evict({
          id: client.cache.identify(item.id),
        });

        client.cache.gc();
      },
    },
  );

  if (loading) {
    return <Loading />;
  }

  if (item) {
    return (
      <>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <Grid item xs={6} sm={3}>
            <Link to={reactiveRouteConfig.routes.post}>
              <Button variant="outlined">
                <FormattedMessage
                  id="preview.edit_item_button"
                  values={{ type: type }}
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
                onSubmit(event, mutateItem, 'draft')
              }
            >
              <FormattedMessage id="preview.save_draft_button" />
            </Button>
          </Grid>
          <Grid className={classes.publishButton} item xs={6} sm={3}>
            <Button
              onClick={(event) =>
                onSubmit(event, mutateItem, 'published')
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
            <ItemListItem preview item={item} session={session} />
          </Box>
        </Paper>

        <Box p={6} textAlign="center">
          <FormattedMessage
            id="preview.detail_text"
            values={{ type: type }}
          />
        </Box>

        <Paper className={classes.paper} elevation={6}>
          <Box p={2}>
            <ItemDetail
              session={session}
              type={type}
              preview
              item={item}
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
            <Link to={reactiveRouteConfig.routes.post}>
              <Button variant="outlined">
                <FormattedMessage id="preview.change_button" />
              </Button>
            </Link>
          </Grid>
          <Grid item sm={4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={(event) =>
                onSubmit(event, mutateItem, 'draft')
              }
            >
              <FormattedMessage id="preview.save_draft_button" />
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              onClick={(event) =>
                onSubmit(event, mutateItem, 'published')
              }
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
  ItemPreview,
);
