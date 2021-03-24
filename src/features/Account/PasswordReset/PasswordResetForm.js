import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Box, Typography, Fade } from '@material-ui/core';
import { RESET_PASSWORD } from './queries';
import TextInput from '../../Shared/Inputs/Text';
import ButtonInput from '../../Shared/Inputs/Button';

function PasswordResetForm({ email, onChange, onSubmit }) {
  const { enqueueSnackbar } = useSnackbar();

  const [passwordReset, { data }] = useMutation(RESET_PASSWORD, {
    variables: { email: email },
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  return (
    <Fade in>
      <Box p={1}>
        {!data && (
          <>
            <Typography paragraph gutterBottom>
              <FormattedMessage id="account.password_reset.description" />
            </Typography>
            <form
              onSubmit={(event) => onSubmit(event, passwordReset)}
            >
              <Box pb={2}>
                {' '}
                <TextInput
                  value={email}
                  name="email"
                  id="email"
                  label={
                    <FormattedMessage id="account.password_reset.input_label" />
                  }
                  onChange={onChange}
                  required
                />
              </Box>

              <ButtonInput
                text={
                  <FormattedMessage id="account.password_reset.button" />
                }
                disabled={email.length < 1}
              />
            </form>
          </>
        )}

        {data && (
          <Typography paragraph>
            <FormattedMessage
              id="account.password_reset.request_success"
              values={{ break: <br /> }}
            />
          </Typography>
        )}
      </Box>
    </Fade>
  );
}

export default PasswordResetForm;
