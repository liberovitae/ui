import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  text: {
    textTransform: 'capitalize',
    fontStyle: 'oblique',
  },
});

const Status = ({ status }) => {
  const classes = useStyles();
  return (
    <Typography
      color="textSecondary"
      component="span"
      variant="caption"
      className={classes.text}
    >
      {status}
    </Typography>
  );
};

export default Status;
