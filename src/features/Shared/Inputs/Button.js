import React from 'react';
import { FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
const ButtonInput = ({ onClick, text, disabled, variant }) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <Button
        onClick={onClick}
        disabled={disabled}
        variant={variant ? variant : 'contained'}
        color="primary"
        type="submit"
      >
        {text}
      </Button>
    </FormControl>
  );
};

export default ButtonInput;
