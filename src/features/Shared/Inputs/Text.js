import React from 'react';
import { FormLabel, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  label: {
    '&::first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

const TextInput = ({
  name,
  value,
  onChange,
  required,
  helperText,
  placeholder,
  password,
  autoFocus,
  endAdornment,
  label,
}) => {
  const classes = useStyles();
  return (
    <FormControl required={required} className={classes.formControl}>
      <FormLabel className={classes.label} id={value}>
        {label}
      </FormLabel>
      <TextField
        id={name}
        autoFocus={autoFocus}
        name={name}
        variant="outlined"
        type={password ? 'password' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        InputProps={{
          endAdornment: endAdornment,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={helperText}
      />
    </FormControl>
  );
};

export default TextInput;
