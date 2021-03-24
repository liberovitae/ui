import React from 'react';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    padding: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    minHeight: '60vh',
    maxWidth: '960px',
    flexDirection: 'column',
  },
}));

const BoxTemplate = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} mx="auto" pl={10} pr={10}>
      <Grid container justify="center">
        <Grid item xs={12} sm={11}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoxTemplate;
