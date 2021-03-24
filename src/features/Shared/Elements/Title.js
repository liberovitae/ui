import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  text: {
    fontSize: '1.2rem',
  },
});
const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography
      color="primary"
      className={classes.text}
      component="span"
      gutterBottom
    >
      {title}
    </Typography>
  );
};

export default Title;
