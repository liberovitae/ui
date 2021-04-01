import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { siteHeader, routeConfig } from '../../constants/globalVars';
import { useReactiveVar } from '@apollo/client';
import { objCompare } from '../../helpers';

const SiteHeader = React.memo(
  ({ matches }) => {
    const reactiveRouteConfig = useReactiveVar(routeConfig);

    const reactiveSearch = useReactiveVar(
      reactiveRouteConfig.searchVar,
    );
    const reactiveHeader = useReactiveVar(siteHeader);
    const useStyles = makeStyles((theme) => ({
      header: {
        [theme.breakpoints.down('xs')]: {
          marginTop: 0,
        },
        marginTop: !objCompare(
          reactiveSearch,
          reactiveRouteConfig.INITIAL_SEARCH_STATE,
        )
          ? '4rem'
          : '2rem',
        padding: '0.5rem',
      },
    }));
    const classes = useStyles();
    return (
      <Grid container>
        <Grid item xs={11}>
          <Typography className={classes.header} variant="h5">
            {reactiveHeader}
          </Typography>
        </Grid>
      </Grid>
    );
  },
  (prevProps, nextProps) => {},
);

export default SiteHeader;
