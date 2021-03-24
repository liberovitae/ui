import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.grey[600],
    paddingRight: theme.spacing(1),
    fontSize: '1rem',
  },
}));

const Subtitle = ({ text }) => {
  const classes = useStyles();

  return (
    <Typography
      component="span"
      className={classes.root}
      gutterBottom
    >
      {text}
    </Typography>
  );
};

export default Subtitle;
