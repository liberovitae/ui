import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ValidatorForm } from 'react-material-ui-form-validator';
import isStrongPassword from 'validator/lib/isStrongPassword';
import history from '../../../constants/history';
import {
  LOGIN,
  PRIVACY,
  TERMS,
  LANDING,
} from '../../../constants/routes';
import { useSnackbar } from 'notistack';
import {
  Box,
  FormControlLabel,
  FormControl,
  Checkbox,
  Fade,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { SIGN_UP } from './queries';
import TextInput from '../../Shared/Inputs/Text';
import ButtonInput from '../../Shared/Inputs/Button';
import { scrollTop } from '../../Shared/ScrollTop';
import TextValidatorInput from '../../Shared/Inputs/TextValidator';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const RegisterForm = ({
  username,
  passwordConfirmation,
  email,
  password,
  onChange,
  onSubmit,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const isInvalid =
    password !== passwordConfirmation ||
    password === '' ||
    email === '' ||
    username === '' ||
    !privacy ||
    !terms;

  const [signUp, { data, loading, error }] = useMutation(SIGN_UP, {
    variables: {
      username: username,
      email: email,
      password: password,
    },
    onCompleted: (data) => {
      enqueueSnackbar(
        'Successfully created account - thanks for signing up!',
        { variant: 'success' },
      );
      localStorage.setItem('token', data.signUp.token);
      scrollTop();
      history.push(LANDING);
    },
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  useEffect(() => {
    return function cleanValidation() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('passwordRules');
    };
  }, []);

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== password) {
      return false;
    }
    return true;
  });

  ValidatorForm.addValidationRule('passwordRules', (value) => {
    if (isStrongPassword(value)) return true;
    return false;
  });

  return (
    <Fade in>
      <Box p={1}>
        <ValidatorForm onSubmit={(event) => onSubmit(event, signUp)}>
          <Box pb={2}>
            <TextInput
              id="username"
              name="username"
              value={username}
              required
              onChange={onChange}
              label={<FormattedMessage id="common.username" />}
            />
          </Box>
          <Box pb={2}>
            <TextInput
              id="email"
              name="email"
              value={email}
              required
              onChange={onChange}
              label={<FormattedMessage id="common.email_address" />}
            />
          </Box>
          <Box pb={2}>
            <TextValidatorInput
              id="password"
              name="password"
              validators={['required', 'passwordRules']}
              errorMessages={[
                <FormattedMessage id="account.password.required_validation_text" />,
                <FormattedMessage id="account.password.isStrongPassword_validation_text" />,
              ]}
              value={password}
              password={!showPassword}
              required
              onChange={onChange}
              label={<FormattedMessage id="common.password" />}
            />
            <FormattedMessage
              id="account.password.password_conditions"
              values={{
                ul: (msg) => <ul>{msg}</ul>,
                li: (msg) => <li>{msg}</li>,
              }}
            />
          </Box>

          <Box pb={2}>
            <TextValidatorInput
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={passwordConfirmation}
              password={!showPassword}
              validators={['isPasswordMatch', 'passwordRules']}
              errorMessages={[
                <FormattedMessage id="account.password.mismatch_validation_text" />,
                <FormattedMessage id="account.password_required_validation_text" />,
              ]}
              required
              onChange={onChange}
              label={
                <FormattedMessage id="common.password_confirmation" />
              }
              helperText={
                <FormattedMessage id="account.register.password_helperText" />
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) =>
                      handleClickShowPassword(e, 'showPassword')
                    }
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box pb={2}>
            <FormControl required>
              <FormControlLabel
                control={
                  <Checkbox
                    id="terms"
                    name="terms"
                    color="primary"
                    required
                    checked={terms}
                    onChange={() => setTerms(!terms)}
                  />
                }
                label={
                  <FormattedMessage
                    id="account.register.terms_label"
                    values={{
                      link: (
                        <Link to={TERMS}>terms and conditions</Link>
                      ),
                    }}
                  />
                }
              />
            </FormControl>

            <FormControlLabel
              required
              control={
                <Checkbox
                  id="privacy"
                  name="privacy"
                  required
                  color="primary"
                  checked={privacy}
                  onChange={() => setPrivacy(!privacy)}
                />
              }
              label={
                <FormattedMessage
                  id="account.register.privacy_label"
                  values={{
                    link: <Link to={PRIVACY}>privacy policy</Link>,
                  }}
                />
              }
            />
          </Box>
          <ButtonInput
            text="Register"
            disabled={isInvalid || loading}
          />
        </ValidatorForm>
        <Box mt={2}>
          <FormattedMessage
            id="account.register.login_text"
            values={{
              link: <Link to={LOGIN}>Login here</Link>,
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default RegisterForm;
