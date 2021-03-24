import React, { useEffect, useState } from 'react';
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
import { SAVE_ITEM, GET_ME_COUNTS, GET_SAVED_ITEMS } from './queries';
import { Redirect, useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import history from '../../../constants/history';
import { routeConfig } from '../../../constants/globalVars';

const SaveItem = ({ session, slug }) => {
  const { type } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [reminder, setReminder] = useState(false);

  const { data, loading, error } = useQuery(
    routeConfig().queries.get,
    {
      onError: (err) =>
        enqueueSnackbar(err.message, { variant: 'error' }),
      variables: { slug: slug },
    },
  );

  const { data: savedData } = useQuery(GET_SAVED_ITEMS);

  useEffect(() => {
    hero({
      title: (
        <FormattedMessage
          id="account.save_item.hero.title"
          values={{ type: type }}
        />
      ),
      subtitle: (
        <FormattedMessage
          id="account.save_item.hero.subtitle"
          values={{ type: type }}
        />
      ),
    });
  }, []);

  const [saveItem] = useMutation(SAVE_ITEM, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
    update(cache, { data: { saveItems } }) {},

    refetchQueries: [
      { query: GET_ME_COUNTS },
      { query: GET_SAVED_ITEMS },
    ],
  });

  const onSaveItem = (event, id) => {
    event.preventDefault();
    saveItem({
      variables: { id: id, itemType: type, reminder: reminder },
    }).then(({ data }) => {
      data.saveItem
        ? (history.push(SAVED),
          enqueueSnackbar(
            <FormattedMessage id="account.save_item.save_success_snackbar" />,
            {
              variant: 'success',
            },
          ))
        : enqueueSnackbar(
            <FormattedMessage id="account.save_item.save_failure_snackbar" />,
            {
              variant: 'error',
            },
          );
    });
  };

  const checkExisting = (item) => {
    return item[type].id === data[type].id;
  };

  if (savedData?.savedItems[`${type}s`].some(checkExisting)) {
    enqueueSnackbar(
      <FormattedMessage id="account.save_item.save_duplicate_snackbar" />,
      { variant: 'warning' },
    );
    return <Redirect to={SAVED} />;
  }

  if (data) {
    return (
      <Grid container>
        <Grid item>
          <Typography>
            <FormattedMessage
              id="account.save_item.save_text"
              values={{ type: type }}
            />
            :{' '}
            <strong>
              {`${data[type].title}`}{' '}
              {data?.[type]?.company &&
                `@ ${data[type].company.name}`}{' '}
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
              <FormattedMessage id="account.save_item.save_reminder_label" />
            }
          />
          <FormHelperText>
            <FormattedMessage
              id="account.save_item.save_reminder_helperText"
              values={{ type: type }}
            />
          </FormHelperText>
        </Grid>
        <Button
          onClick={(event) => onSaveItem(event, data[type].id)}
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

export default SaveItem;
