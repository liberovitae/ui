import React from 'react';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tooltip } from '@material-ui/core';

const useStyles = makeStyles({
  stat: {
    padding: '0.5rem',
  },
  icon: {
    verticalAlign: 'bottom',
    marginRight: '0.2rem',
  },
});
const Stats = ({ stats }) => {
  const classes = useStyles();

  const { views, visits, saves } = stats;

  return (
    <Grid container>
      <Tooltip title={`Viewed by ${views || 0} people`}>
        <Grid item className={classes.stat}>
          <VisibilityOutlinedIcon
            className={classes.icon}
            fontSize="small"
          />
          {views || 0}
        </Grid>
      </Tooltip>
      <Tooltip title={`Visited by ${visits || 0} people`}>
        <Grid item className={classes.stat}>
          <ExitToAppOutlinedIcon
            className={classes.icon}
            fontSize="small"
          />
          {visits || 0}
        </Grid>
      </Tooltip>
      <Tooltip title={`Saved by ${saves || 0} people`}>
        <Grid item className={classes.stat}>
          <FavoriteBorderOutlinedIcon
            className={classes.icon}
            fontSize="small"
          />
          {saves || 0}
        </Grid>
      </Tooltip>
    </Grid>
  );
};

export default Stats;
