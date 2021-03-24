import React from 'react';
import {
  FormControl,
  TextField,
  FormLabel,
  Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
}));

const AutoCompleteInput = ({
  name,
  data,
  value,
  onChange,
  freeSolo,
  helperText,
  textFieldLabel,
  required,
  disabled,
  label,
  maxLength,
  getOptionDisabled,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      name={name}
      required={required}
      className={classes.formControl}
    >
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <Autocomplete
        multiple
        autoSelect
        id={name}
        options={data.map((option) => option)}
        freeSolo={freeSolo}
        getOptionDisabled={getOptionDisabled}
        required={required}
        disabled={disabled}
        limitTags={10}
        name={name}
        value={value}
        onChange={(event, value) => {
          event.target = {
            name: name,
            value: value,
          };

          onChange(event);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            label={textFieldLabel}
            variant="outlined"
            helperText={helperText}
            inputProps={{
              ...params.inputProps,
              maxLength: maxLength,
              required: required ? value.length === 0 : null,
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default AutoCompleteInput;
