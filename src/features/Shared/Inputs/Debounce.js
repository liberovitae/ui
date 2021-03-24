import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DebounceInput } from 'react-debounce-input';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
}));

const Debounce = React.memo(
  ({ value, id, name, label, onChange, endAdornment, disabled }) => {
    const classes = useStyles();

    return (
      <FormControl className={classes.formControl}>
        <DebounceInput
          element={TextField}
          disabled={disabled}
          id={id}
          minLength={value && value.length < 2 ? 3 : 0}
          debounceTimeout={300}
          name={name}
          InputProps={{
            endAdornment: endAdornment,
          }}
          label={label}
          value={value}
          onChange={(event) => onChange(event)}
          variant="outlined"
        />
      </FormControl>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.label === nextProps.label) return true;
    return false;
  },
);

export default Debounce;
