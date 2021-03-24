import React from 'react';
import { Typography } from '@material-ui/core';

const Tagline = ({ tagline }) => (
  <Typography color="primary" component="p" variant="body1">
    {tagline}
  </Typography>
);

export default Tagline;
