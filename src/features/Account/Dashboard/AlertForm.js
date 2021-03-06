import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useMutation, useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Box,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Fade,
  Divider,
} from '@material-ui/core';
import ButtonInput from '../../Shared/Inputs/Button';
import TextInput from '../../Shared/Inputs/Text';
import AutoCompleteInput from '../../Shared/Inputs/AutoComplete';
import SelectInput from '../../Shared/Inputs/Select';
import LocationInput from '../../Shared/Inputs/Location';
import RadioInput from '../../Shared/Inputs/Radio';
import {
  CREATE_ALERT,
  UPDATE_ALERT,
  GET_ALERTS,
  GET_ALERT,
  GET_ME_COUNTS,
} from './queries';
import { isSafari } from 'react-device-detect';
import {
  routeConfig,
  tabIndex,
  hero,
} from '../../../constants/globalVars';
import routeConfigs from '../../../constants/routeConfig';
import Loading from '../../Shared/Loading';
import { subscribeUserToPush } from '../../../helpers/subscriptions';
import regions from '../../../constants/regions';
import { ALERTS } from '../../../constants/routes';
import history from '../../../constants/history';

const INITIAL_SEARCH_STATE = routeConfig().INITIAL_STATE;

const INITIAL_STATE = {
  ...INITIAL_SEARCH_STATE,
  id: '',
  alertType: routeConfig().type,
  name: '',
  frequency: 'weekly',
  active: true,
  email: true,
  notification: false,
  subscription: null,
};

const AlertForm = ({ refetch }) => {
  const { slug } = useParams();
  const [state, setState] = useState(INITIAL_STATE);
  const {
    id,
    name,
    alertType,
    keywords,
    location,
    frequency,
    regions,
    types,
    active,
    email,
    notification,
    subscription,
  } = state;

  useEffect(() => {
    if (history?.location?.query) {
      setState({
        ...INITIAL_STATE,
        ...history.location.query,
      });
    }
    hero({
      title: <FormattedMessage id="alerts" />,
      subtitle: slug ? (
        <FormattedMessage id="alert_form.hero.subtitle_edit" />
      ) : (
        <FormattedMessage id="alert_form.hero.subtitle_create" />
      ),
    });
    if (slug) {
      getAlert({ variables: { slug: slug } });
    }
  }, [slug]);

  useEffect(() => {
    routeConfig(routeConfigs[alertType]);
    tabIndex(routeConfig().tabIndex);
  }, [alertType]);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [mutateAlert, { data, error }] = useMutation(
    id ? UPDATE_ALERT : CREATE_ALERT,
    {
      variables: {
        id: id,
        input: {
          name: name,
          alertType: alertType,
          keywords: keywords,
          location: location.name,
          frequency: frequency,
          regions: state.regions,
          types: types,
          active: active,
          email: email,
          notification: notification,
          subscription: subscription,
        },
      },

      refetchQueries: [
        { query: GET_ALERTS },
        { query: GET_ME_COUNTS },
      ],
      onError: (err) =>
        enqueueSnackbar(err.message, {
          variant: 'error',
        }),
      onCompleted: (data) => {
        enqueueSnackbar(
          Object.keys(data)[0] === 'updateAlert' ? (
            <FormattedMessage id="alert_form.updated_success_snackbar" />
          ) : (
            <FormattedMessage id="alert_form.created_success_snackbar" />
          ),
          {
            variant: 'success',
          },
        );
        refetch();
        return history.push(ALERTS);
      },
    },
  );

  const [getAlert, { loading }] = useLazyQuery(GET_ALERT, {
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ alert }) => {
      const {
        id,
        name,
        alertType,
        keywords,
        location,
        regions,
        types,
        frequency,
        active,
        email,
        notification,
        subscription,
      } = alert;

      setState({
        id: id,
        name: name,
        alertType: alertType,
        keywords: keywords,
        location: { name: location },
        regions: regions,
        types: types,
        frequency: frequency,
        active: active,
        email: email,
        notification: notification,
        subscription: subscription,
      });
    },
    onError: (err) => (
      enqueueSnackbar(
        <FormattedMessage id="alert_form.not_found_snackbar" />,
        {
          variant: 'error',
        },
      ),
      history.push(ALERTS)
    ),
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    mutateAlert();
  };

  if (!loading) {
    return (
      <Fade in>
        <div>
          <Typography paragraph gutterBottom>
            <FormattedMessage
              id="alert_form.description"
              values={{ break: <br /> }}
            />
          </Typography>

          <Divider variant="fullWidth" />
          <form onSubmit={(event) => onSubmit(event)}>
            <Box pt={2}>
              <Typography paragraph gutterBottom variant="h5">
                <FormattedMessage id="alert_form.title" />
              </Typography>
            </Box>
            <Box pb={2}>
              <RadioInput
                name="alertType"
                value={alertType}
                onChange={onChange}
              />
            </Box>
            <Box pb={2}>
              <TextInput
                required
                name="name"
                value={name}
                label={<FormattedMessage id="common.name" />}
                onChange={onChange}
                helperText={
                  <FormattedMessage id="alert_form.name_input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <TextInput
                name="keywords"
                value={keywords}
                label={<FormattedMessage id="common.keywords" />}
                onChange={onChange}
                helperText={
                  <FormattedMessage id="alert_form.keywords_input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <LocationInput
                label={
                  <FormattedMessage id="alert_form.location_input_label" />
                }
                location={location}
                onChange={onChange}
                helperText="For exact city, state or country filtering if necessary or leave blank for all locations."
              />
            </Box>
            <Box pb={2}>
              <AutoCompleteInput
                data={regions()}
                value={state.regions}
                onChange={onChange}
                name="regions"
                label={
                  <FormattedMessage id="alert_form.regions_input_label" />
                }
                helperText={
                  <FormattedMessage id="alert_form.regions_input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <AutoCompleteInput
                data={routeConfig().types()}
                value={types}
                onChange={onChange}
                name="types"
                label={
                  <FormattedMessage id="alert_form.types_input_label" />
                }
                helperText={
                  <FormattedMessage
                    id="alert_form.types_input_helperText"
                    values={{ type: routeConfig().type }}
                  />
                }
              />
            </Box>
            <Box pb={2}>
              <SelectInput
                onChange={onChange}
                name="frequency"
                data={[
                  {
                    label: 'Weekly',
                    value: 'weekly',
                  },
                  { label: 'Daily', value: 'daily' },
                ]}
                value={frequency}
                required
                label={
                  <FormattedMessage id="alert_form.frequency_input_label" />
                }
              />
            </Box>
            <Box pb={2}>
              <FormLabel>Send alert as</FormLabel>
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={email}
                    onChange={() =>
                      setState((prevState) => ({
                        ...prevState,
                        email: !email,
                      }))
                    }
                    name="email"
                    color="primary"
                  />
                }
                label="Email"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    disabled={isSafari}
                    checked={notification}
                    onChange={() => {
                      setState((prevState) => ({
                        ...prevState,
                        notification: !notification,
                      }));
                      if (!notification) {
                        subscribeUserToPush().then((subscription) =>
                          setState((prevState) => ({
                            ...prevState,
                            subscription: subscription,
                          })),
                        );
                      }
                    }}
                    name="notification"
                    color="primary"
                  />
                }
                label={'Notification'}
              />
              {isSafari && (
                <FormHelperText>
                  Push notifications unavailable on Safari
                </FormHelperText>
              )}
            </Box>

            <Box pb={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={active}
                    onChange={() =>
                      setState((prevState) => ({
                        ...prevState,
                        active: !active,
                      }))
                    }
                    name="active"
                    color="primary"
                  />
                }
                label={
                  <FormattedMessage id="alert_form.active_input_label" />
                }
              />
            </Box>

            <Box pb={2}>
              <FormHelperText>
                <FormattedMessage id="alert_form.helperText" />
              </FormHelperText>
            </Box>
            <Box pb={2}>
              <ButtonInput
                disabled={!notification && !email}
                text="Save"
              />
            </Box>
          </form>
        </div>
      </Fade>
    );
  }
  return <Loading />;
};

export default AlertForm;
