import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formLabel: {
    color: theme.palette.text.secondary,
  },
  formControlLabel: {
    marginLeft: 0,
  },
}));

const RadioInput = ({ name, value, onChange }) => {
  const classes = useStyles();
  return (
    <FormControl component="fieldset">
      <FormLabel className={classes.formLlabel} component="label">
        Alert type
      </FormLabel>
      <RadioGroup
        className={classes.formLabel}
        onChange={(e) => {
          onChange(e);
        }}
        row
        aria-label="position"
        name={name}
        value={value}
      >
        <FormControlLabel
          value="venue"
          control={<Radio color="primary" />}
          label="Venue"
          className={classes.formControlLabel}
          labelPlacement="start"
        />
        <FormControlLabel
          value="job"
          control={<Radio color="primary" />}
          label="Job"
          labelPlacement="start"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
