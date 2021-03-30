import React, { useEffect, useState } from 'react';
import {
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  label: {
    '&::first-letter': {
      textTransform: 'uppercase',
    },
  },
}));

const SelectInput = ({
  id,
  name,
  value,
  data,
  label,
  helperText,
  onChange,
  required,
}) => {
  const classes = useStyles();

  const [localValue, setLocalValue] = useState(false);

  useEffect(() => {
    // Work around loading value as default in material-ui select
    value && setLocalValue(value);
  }, [value]);

  return (
    <FormControl
      required={required}
      variant="outlined"
      className={classes.formControl}
    >
      <FormLabel className={classes.label} id={`${id}-label`}>
        {label}
      </FormLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={localValue}
        name={name}
        onChange={(e) => {
          onChange(e);
          setLocalValue(e.target.value);
        }}
        required={required}
      >
        {data &&
          data.map((item) => (
            <MenuItem
              key={item.value || item.id}
              value={item.value || item.id}
            >
              {item.label || item.title}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
