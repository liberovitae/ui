import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { useMutation } from '@apollo/client';
import { Grid, Box, Fade } from '@material-ui/core';
import { SETTINGS } from '../../../constants/routes';
import withAuthorization from '../../Session/withAuthorization';
import { EDIT_ACCOUNT } from './queries';
import { useSnackbar } from 'notistack';
import TextInput from '../../Shared/Inputs/Text';
import ButtonInput from '../../Shared/Inputs/Button';

const EditAccount = ({ session, refetch, history }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState(
    session.me.secondaryEmail || session.me.email,
  );

  const [updateUser] = useMutation(EDIT_ACCOUNT);

  const onChange = (event) => {
    const { value } = event.target;
    setState(value);
  };

  const onUserUpdate = (email) => {
    updateUser({
      variables: { email: email },
    }).then(({ data }) => {
      refetch();
      const key = Object.keys(data)[0];
      data[key]
        ? (enqueueSnackbar(
            'To verify your new email address please click on the link in the verification email that has been sent to you.',
            {
              variant: 'warning',
            },
          ),
          history.push(SETTINGS))
        : enqueueSnackbar(
            <FormattedMessage id="account.edit.failure_snackbar" />,
            {
              variant: 'error',
            },
          );
    });

    return true;
  };

  const onSubmit = (event) => {
    if (
      state === session?.me?.email ||
      state === session?.me?.secondaryEmail
    )
      return history.push(SETTINGS);

    event.preventDefault();
    onUserUpdate(state);
  };
  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.edit.hero.title" />,
      subtitle: <FormattedMessage id="account.edit.hero.subtitle" />,
    });
  }, []);

  return (
    <Fade in>
      <Box p={1}>
        <form onSubmit={(event) => onSubmit(event)}>
          <Grid container spacing={4} justify="center">
            <Grid item xs={12}>
              <TextInput
                id="email"
                name="email"
                value={state}
                onChange={onChange}
                required
                label={<FormattedMessage id="common.email_address" />}
              />
            </Grid>

            <Grid item xs={12}>
              <ButtonInput
                text={
                  <FormattedMessage id="account.edit.save_button" />
                }
              />

              <Link to={SETTINGS}>
                <ButtonInput
                  variant="outlined"
                  text={
                    <FormattedMessage id="account.edit.back_button" />
                  }
                />
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fade>
  );
};

export default withAuthorization((session) => session && session.me)(
  EditAccount,
);
