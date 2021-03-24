import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Box,
  Typography,
  Fade,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { SETTINGS } from '../../../constants/routes';
import history from '../../../constants/history';
import withAuthorization from '../../Session/withAuthorization';
import { EDIT_PASSWORD } from './queries';
import TextInput from '../../Shared/Inputs/Text';
import ButtonInput from '../../Shared/Inputs/Button';
import TextValidatorInput from '../../Shared/Inputs/TextValidator';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const EditPassword = ({}) => {
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    passwordConfirm: '',
    showOldPassword: false,
    showNewPassword: false,
  });

  const [updatePassword] = useMutation(EDIT_PASSWORD, {
    onError: (err) =>
      enqueueSnackbar(err.message, { variant: 'error' }),
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onPasswordUpdate = () => {
    updatePassword({
      onError: (err) =>
        enqueueSnackbar(err.message, { variant: 'error' }),
      variables: {
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      },
    }).then((data) => {
      if (data && data.data.updatePassword) {
        enqueueSnackbar(
          <FormattedMessage id="account.password.save_success_snackbar" />,
          {
            variant: 'success',
          },

          history.push(SETTINGS),
        );
      }
    });
  };

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== state.newPassword) {
      return false;
    }
    return true;
  });

  ValidatorForm.addValidationRule('passwordRules', (value) => {
    if (isStrongPassword(value)) return true;
    return false;
  });

  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.password.hero.title" />,
      subtitle: (
        <FormattedMessage id="account.password.hero.subtitle" />
      ),
    });

    return function cleanValidation() {
      ValidatorForm.removeValidationRule('isPasswordMatch');
      ValidatorForm.removeValidationRule('passwordRules');
    };
  }, []);

  const handleClickShowPassword = (e, key) => {
    setState({ ...state, [key]: !state[key] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Fade in>
      <Box>
        <ValidatorForm onSubmit={onPasswordUpdate}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Typography paragraph gutterBottom>
                <FormattedMessage id="account.password.description" />
              </Typography>

              <Box pb={1}>
                <TextInput
                  id="oldPassword"
                  name="oldPassword"
                  value={state.oldPassword}
                  onChange={onChange}
                  required
                  password={!state.showOldPassword}
                  label={
                    <FormattedMessage id="account.password.old_password_input_label" />
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) =>
                          handleClickShowPassword(
                            e,
                            'showOldPassword',
                          )
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {state.showOldPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>

              <Box pb={1}>
                <TextValidatorInput
                  id="newPassword"
                  name="newPassword"
                  label={
                    <FormattedMessage id="account.password.new_password_input_label" />
                  }
                  validators={['required', 'passwordRules']}
                  errorMessages={[
                    <FormattedMessage id="account.password.required_validation_text" />,
                    <FormattedMessage id="account.password.isStrongPassword_validation_text" />,
                  ]}
                  value={state.newPassword}
                  onChange={onChange}
                  required
                  password={!state.showNewPassword}
                />
              </Box>
              <FormattedMessage
                id="account.password.password_conditions"
                values={{
                  ul: (msg) => <ul>{msg}</ul>,
                  li: (msg) => <li>{msg}</li>,
                }}
              />
              <Box pb={1}>
                <TextValidatorInput
                  id="passwordConfirm"
                  name="passwordConfirm"
                  label={
                    <FormattedMessage id="account.password.new_password_confirmation_input_label" />
                  }
                  validators={['isPasswordMatch', 'passwordRules']}
                  errorMessages={[
                    <FormattedMessage id="account.password.mismatch_validation_text" />,
                    <FormattedMessage id="account.password_required_validation_text" />,
                  ]}
                  value={state.passwordConfirm}
                  onChange={onChange}
                  required
                  password={!state.showNewPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={(e) =>
                          handleClickShowPassword(
                            e,
                            'showNewPassword',
                          )
                        }
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {state.showOldPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <ButtonInput
                text={
                  <FormattedMessage id="account.password.save_button" />
                }
              />

              <Link to={SETTINGS}>
                <ButtonInput
                  variant="outlined"
                  text={
                    <FormattedMessage id="account.password.back_button" />
                  }
                />
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Box>
    </Fade>
  );
};

export default withAuthorization((session) => session && session.me)(
  EditPassword,
);
