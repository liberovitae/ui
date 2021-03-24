import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  LANDING,
  JOB_POST,
  MY_JOBS,
  REGISTER,
  LOGIN,
} from '../../../constants/routes';
import { hero } from '../../../constants/globalVars';

const useStyles = makeStyles({
  root: {
    marginTop: '4rem',
    marginBottom: '2rem',
  },
});

const NotFound = React.memo(({}) => {
  const classes = useStyles();
  useEffect(() => {
    hero(null);
  }, []);

  return (
    <Grid
      container
      alignItems="center"
      align="center"
      justify="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <div className="center">
          <div className="error">
            <div className="number">4</div>
            <div className="illustration">
              <div className="circle"></div>
              <div className="clip">
                <div className="paper">
                  <div className="face">
                    <div className="eyes">
                      <div className="eye eye-left"></div>
                      <div className="eye eye-right"></div>
                    </div>
                    <div className="rosyCheeks rosyCheeks-left"></div>
                    <div className="rosyCheeks rosyCheeks-right"></div>
                    <div className="mouth"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="number">4</div>
          </div>
        </div>
        <Typography paragraph variant="h6">
          Sorry, but we can't seem to find the page you're looking
          for.
        </Typography>
        <Typography paragraph>
          Here are some links that you might find useful:
        </Typography>
        <Typography>
          <Link to={LANDING}>Find a job</Link>
        </Typography>
        <Typography>
          <Link to={JOB_POST}>Post a job</Link>
        </Typography>
        <Typography>
          <Link to={MY_JOBS}> Manage your saved jobs</Link>
        </Typography>
        <Typography>
          <Link to={REGISTER}>Sign up</Link> or{' '}
          <Link to={LOGIN}>log in</Link>
        </Typography>
      </Grid>
    </Grid>
  );
});

export default NotFound;
