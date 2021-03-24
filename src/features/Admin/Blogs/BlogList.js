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
import { BLOG_POST, ADMIN_BLOGS } from '../../../constants/routes';
import history from '../../../constants/history';
import {
  GET_ALL_BLOGS,
  DELETE_BLOG,
  SET_BLOG_STATUS,
} from '../../Blog/queries';
import StatusChip from '../../Shared/Elements/Status';

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
  deleteButton: {
    margin: '1rem',
  },
}));

const BlogList = ({ refetch }) => {
  const intl = useIntl();
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();
  const { data, loading, error } = useQuery(GET_ALL_BLOGS);

  const [deleteBlog, { client }] = useMutation(DELETE_BLOG, {
    refetchQueries: [
      {
        query: GET_ALL_BLOGS,
        variables: { limit: 20, cache: false },
      },
    ],
  });

  const [setStatus] = useMutation(SET_BLOG_STATUS, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    refetchQueries: [{ query: GET_ALL_BLOGS }],
  });

  const confirmDelete = (id) => {
    const r = window.confirm(
      intl.formatMessage({ id: 'admin.blogs.confirm_delete' }),
    );
    if (r === true) {
      onDelete(id);
    } else {
      return;
    }
  };

  const onDelete = (id) => {
    deleteBlog({ variables: { id: id } }).then((res) =>
      res.data.deleteBlog
        ? (enqueueSnackbar(
            <FormattedMessage id="admin.blogs.remove_success_snackbar" />,
            {
              variant: 'success',
            },
          ),
          client.cache.evict({
            id: client.cache.identify(id),
          }))
        : enqueueSnackbar(
            <FormattedMessage id="admin.blogs.remove_failure_snackbar" />,
            {
              variant: 'error',
            },
          ),
    );
    return history.push(ADMIN_BLOGS);
  };

  useEffect(() => {
    hero({
      title: <FormattedMessage id="admin.blogs.hero.title" />,
      subtitle: <FormattedMessage id="admin.blogs.hero.subtitle" />,
    });
  }, []);

  return (
    <Fade in>
      <div>
        <div className={classes.description}>
          <Typography paragraph>
            <FormattedMessage id="admin.blogs.description" />
          </Typography>
          <Grid container align="center">
            <Grid item xs={6}></Grid>

            <Grid item xs={6}>
              <Link to={BLOG_POST}>
                <Button
                  variant="contained"
                  onClick={() => localStorage.removeItem('blog')}
                  color="primary"
                >
                  <FormattedMessage id="admin.blogs.create_button" />
                </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
        <Divider className={classes.divider} />
        <Grid container>
          {data &&
            data.allBlogs.map((blog) => (
              <Grid
                item
                className={classes.itemControl}
                key={blog.id}
              >
                <Grid item className={classes.flexContainer}>
                  <Typography variant="h6">{blog.title}</Typography>
                  <StatusChip status={blog.status} />
                </Grid>

                <div>
                  <Button
                    onClick={() =>
                      history.push(`/blog/post/${blog.slug}`)
                    }
                    disabled={blog.status === 'filled'}
                    variant="outlined"
                    color="primary"
                  >
                    <FormattedMessage id="common.edit" />
                  </Button>

                  <Button
                    onClick={(event) => confirmDelete(blog.id)}
                    className={classes.deleteButton}
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
        {data && !data.allBlogs.length && (
          <Typography align="center">
            <FormattedMessage id="admin.blogs.none_found" />
          </Typography>
        )}
      </div>
    </Fade>
  );
};

export default BlogList;
