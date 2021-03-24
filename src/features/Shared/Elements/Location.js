import React from 'react';
import { routeConfig } from '../../../constants/globalVars';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactCountryFlag from 'react-country-flag';
import ExploreIcon from '@material-ui/icons/Explore';

const useStyles = makeStyles({
  flag: {
    marginLeft: '0.5rem',
    marginBottom: '0.2rem',
    width: '1.2rem',
    height: '1.2rem',
  },
  explore: {
    verticalAlign: 'bottom',
    marginLeft: '0.2rem',
  },
  text: {
    overflowWrap: 'anywhere',
    cursor: 'pointer',
  },
});

const JobLocation = React.memo(
  ({ location }) => {
    const classes = useStyles();
    const jobCountry = location.name.split(',').pop().trim();

    const { searchVar } = routeConfig();
    return (
      <>
        <Typography
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            searchVar({
              ...searchVar(),
              location: { name: location.name },
            });
          }}
          className={classes.text}
          color="textPrimary"
          component="span"
        >
          {location.name}
          {jobCountry.length === 2 ? (
            <ReactCountryFlag
              countryCode={jobCountry}
              svg
              className={classes.flag}
              title={jobCountry}
            />
          ) : (
            <ExploreIcon
              color="primary"
              className={classes.explore}
            />
          )}
        </Typography>
      </>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.location === nextProps.location) return true;
    return false;
  },
);

export default JobLocation;
