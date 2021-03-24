import React from 'react';
import {
  FormLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
}) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <FormLabel id={`${id}-label`}>{label}</FormLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        value={value}
        name={name}
        IconComponent={Typography}
        onChange={onChange}
      >
        {data &&
          data.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
