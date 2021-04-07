import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { hero } from '../../../constants/globalVars';
import { SAVED } from '../../../constants/routes';
import { SAVE_POST, GET_MY_COUNTS, GET_SAVED_POSTS } from './queries';
import { Loading } from '../../Shared';
import history from '../../../constants/history';
import { GET_POST } from '../../Post/queries';

const SavePost = ({ session }) => {
  const { type, slug } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [reminder, setReminder] = useState(false);

  const { data, loading, error } = useQuery(GET_POST, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    variables: { slug },
  });
  const checkExisting = ({ post }) => {
    return post.id === data.post.id;
  };
  const { data: savedData } = useQuery(GET_SAVED_POSTS);

  useEffect(() => {
    hero({
      title: (
        <FormattedMessage
          id="account.save_post.hero.title"
          values={{ type }}
        />
      ),
      subtitle: (
        <FormattedMessage
          id="account.save_post.hero.subtitle"
          values={{ type }}
        />
      ),
    });

    if (savedData?.savedPosts?.some(checkExisting)) {
      enqueueSnackbar(
        <FormattedMessage
          id="account.save_post.save_duplicate_snackbar"
          values={{ type }}
        />,
        { variant: 'warning' },
      );
      history.push(SAVED);
    }
  }, []);

  const [savePost] = useMutation(SAVE_POST, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    update(cache, { data: { savePosts } }) {},

    refetchQueries: [
      { query: GET_MY_COUNTS },
      { query: GET_SAVED_POSTS },
    ],
  });

  const onSavePost = (e, id) => {
    e.preventDefault();
    savePost({
      variables: { id, reminder },
    }).then(({ data }) => {
      data.savePost
        ? (history.push(SAVED),
          enqueueSnackbar(
            <FormattedMessage
              id="account.save_post.save_success_snackbar"
              values={{ type }}
            />,
            {
              variant: 'success',
            },
          ))
        : enqueueSnackbar(
            <FormattedMessage
              id="account.save_post.save_failure_snackbar"
              values={{ type }}
            />,
            {
              variant: 'error',
            },
          );
    });
  };

  if (data) {
    const { post } = data;
    return (
      <Grid container>
        <Grid item>
          <Typography>
            <FormattedMessage
              id="account.save_post.save_text"
              values={{ type }}
            />
            :{' '}
            <strong>
              {`${post.title}`}{' '}
              {post?.parent && `@ ${post?.parent?.title}`}{' '}
            </strong>
          </Typography>
          <FormControlLabel
            style={{ marginTop: '1rem' }}
            control={
              <Checkbox
                checked={reminder}
                onChange={() => setReminder(!reminder)}
                name="reminder"
                color="primary"
              />
            }
            label={
              <FormattedMessage id="account.save_post.save_reminder_label" />
            }
          />
          <FormHelperText>
            <FormattedMessage
              id="account.save_post.save_reminder_helperText"
              values={{ type }}
            />
          </FormHelperText>
        </Grid>
        <Button
          onClick={(e) => onSavePost(e, post.id)}
          style={{ width: '100%', marginTop: '1rem' }}
          color="primary"
          variant="contained"
        >
          <FormattedMessage id="common.save" />
        </Button>
      </Grid>
    );
  }

  return <Loading />;
};

export default SavePost;
