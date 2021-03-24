import React from 'react';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import { Box, Typography } from '@material-ui/core';

dayjs.extend(RelativeTime);

const PublishedTime = ({ time }) => (
  <Box textAlign="right">
    <Typography
      color="textSecondary"
      component="span"
      variant="caption"
    >
      {dayjs(time).fromNow()}
    </Typography>
  </Box>
);

export default PublishedTime;
