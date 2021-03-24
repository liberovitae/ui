import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { PASSWORD_RESET, LANDING } from '../../../constants/routes';
import { RegisterLink } from '../Register';
import { SIGN_IN } from './queries';
import {
  Box,
  IconButton,
  InputAdornment,
  Fade,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TextInput from '../../Shared/Inputs/Text';
import ButtonInput from '../../Shared/Inputs/Button';

function LoginForm({ login, password, onChange, onSubmit, refetch }) {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const isInvalid = password === '' || login === '';
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN, {
    variables: { login: login, password: password },
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn.token);
      refetch();
      history.push(LANDING);
    },
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  return (
    <Fade in>
      <Box p={1}>
        <form onSubmit={(event) => onSubmit(event, signIn)}>
          <Box pb={2}>
            {' '}
            <TextInput
              value={login}
              name="login"
              id="login"
              label={
                <FormattedMessage id="account.login.input_username_label" />
              }
              onChange={onChange}
              required
            />
          </Box>
          <Box pb={2}>
            <TextInput
              value={password}
              name="password"
              id="password"
              password={!values.showPassword}
              label={<FormattedMessage id="common.password" />}
              onChange={onChange}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <ButtonInput
            text={<FormattedMessage id="common.login" />}
            disabled={isInvalid || loading}
          />
        </form>
        <div>
          <p>
            <Link to={PASSWORD_RESET}>Forgot password?</Link>
          </p>
          <RegisterLink />
        </div>
      </Box>
    </Fade>
  );
}

export default LoginForm;
