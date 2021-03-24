import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { hero } from '../../../constants/globalVars';
import { useMutation } from '@apollo/client';
import { ValidatorForm } from 'react-material-ui-form-validator';
import TextValidatorInput from '../../Shared/Inputs/TextValidator';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { useSnackbar } from 'notistack';
import { LOGIN } from '../../../constants/routes';
import { Box, Typography, Fade } from '@material-ui/core';
import { SET_PASSWORD } from './queries';
import ButtonInput from '../../Shared/Inputs/Button';

function NewPasswordForm({
  password,
  passwordConfirmation,
  onChange,
  onSubmit,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { token } = useParams();

  const [passwordReset, { data }] = useMutation(SET_PASSWORD, {
    variables: { token: token, password: password },
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  useEffect(() => {
    hero({
      title: (
        <FormattedMessage id="account.new_password.success.hero.title" />
      ),
      subtitle: (
        <FormattedMessage id="account.new_password.success.hero.subtitle" />
      ),
    });
  }, []);

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
        {!data && (
          <>
            <Typography paragraph gutterBottom>
              <FormattedMessage id="account.new_password.description" />
            </Typography>
            <ValidatorForm
              onSubmit={(event) => onSubmit(event, passwordReset)}
            >
              <Box pb={2}>
                <TextValidatorInput
                  value={password}
                  name="password"
                  id="password"
                  password={!showPassword}
                  label={
                    <FormattedMessage id="account.new_password.password_input_label" />
                  }
                  onChange={onChange}
                  required
                  validators={['required', 'passwordRules']}
                  errorMessages={[
                    <FormattedMessage id="account.password.required_validation_text" />,
                    <FormattedMessage id="account.password.isStrongPassword_validation_text" />,
                  ]}
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
                  value={passwordConfirmation}
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  password={!showPassword}
                  label={
                    <FormattedMessage id="account.new_password.passwordConfirm_input_label" />
                  }
                  onChange={() => setShowPassword(!showPassword)}
                  required
                  validators={['isPasswordMatch', 'passwordRules']}
                  errorMessages={[
                    <FormattedMessage id="account.password.mismatch_validation_text" />,
                    <FormattedMessage id="account.password_required_validation_text" />,
                  ]}
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

              <ButtonInput
                text={
                  <FormattedMessage id="account.new_password.button" />
                }
              />
            </ValidatorForm>
          </>
        )}

        {data && (
          <>
            <Typography paragraph gutterBottom>
              <FormattedMessage id="account.new_password.success_description" />
            </Typography>
            <Link to={LOGIN}>
              <ButtonInput text="Go to login page" />
            </Link>
          </>
        )}
      </Box>
    </Fade>
  );
}

export default NewPasswordForm;
