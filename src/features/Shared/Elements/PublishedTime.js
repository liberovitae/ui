import React from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { Typography } from '@material-ui/core';

dayjs.extend(RelativeTime);

const PublishedTime = ({ time }) => (
  <Typography
    color="textSecondary"
    component="span"
    variant="caption"
  >
    {dayjs(time).fromNow()}
  </Typography>
);

export default PublishedTime;
