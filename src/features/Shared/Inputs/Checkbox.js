import React from 'react';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    display: 'contents',
  },
  formLabel: {
    color: theme.palette.text.secondary,
  },
  formGroup: {
    margin: 'auto',
    paddingLeft: '1rem',
    justifyContent: 'space-evenly',
  },
}));

const CheckboxInput = ({ value, data, state, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl} component="fieldset">
      <FormGroup className={classes.formGroup} row>
        {data.map((item) => {
          return (
            <FormControlLabel
              key={item}
              name={item}
              className={classes.formLabel}
              onChange={(event) => onChange(event)}
              value={item}
              checked={state.includes(item)}
              control={<Checkbox color="primary" />}
              label={item}
              labelPlacement="end"
            />
          );
        })}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxInput;
