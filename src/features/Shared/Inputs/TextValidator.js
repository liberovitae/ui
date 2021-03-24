import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  textValidation: {
    width: '100%',
  },
}));

const TextValidatorInput = ({
  name,
  id,
  value,
  validators,
  errorMessages,
  onChange,
  label,
  required,
  password,
  endAdornment,
}) => {
  const classes = useStyles();

  return (
    <FormControl required={required} className={classes.formControl}>
      <FormLabel id={id}>{label}</FormLabel>
      <TextValidator
        id={id}
        className={classes.textValidation}
        name={name}
        variant="outlined"
        validators={validators}
        errorMessages={errorMessages}
        value={value}
        InputProps={{
          endAdornment: endAdornment,
        }}
        onChange={onChange}
        required={required}
        type={password ? 'password' : 'text'}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </FormControl>
  );
};

TextValidatorInput.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  validators: PropTypes.array,
  errorMessages: PropTypes.array,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  password: PropTypes.bool,
  label: PropTypes.object,
};

export default TextValidatorInput;
