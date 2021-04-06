import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';

const NoPosts = ({ type }) => (
  <Box p={4}>
    <Typography align="center" paragraph>
      <img height={200} src="/img/noposts.png" />
      <br />
      There are no {type}s yet -{' '}
      <Link to={`/${type}/create`}>be the first to post one!</Link>
    </Typography>
  </Box>
);

export default NoPosts;
