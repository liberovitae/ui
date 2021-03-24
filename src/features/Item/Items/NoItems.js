import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';

const NoItems = ({ reactiveRouteConfig }) => (
  <Box p={4}>
    <Typography align="center" paragraph>
      <img height={200} src="/img/noitems.png" />
      <br />
      There are no {reactiveRouteConfig.type}s yet -{' '}
      <Link to={reactiveRouteConfig.routes.post}>
        be the first to post one!
      </Link>
    </Typography>
  </Box>
);

export default NoItems;
