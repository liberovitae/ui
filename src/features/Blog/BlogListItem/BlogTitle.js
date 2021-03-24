import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  title: {
    fontSize: '1.2rem',
  },
});
const BlogTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography
      color="primary"
      className={classes.title}
      component="span"
      gutterBottom
    >
      {title}
    </Typography>
  );
};

export default BlogTitle;
