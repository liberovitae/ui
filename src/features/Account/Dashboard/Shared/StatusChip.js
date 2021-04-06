import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as ROUTE_CONFIGS from '../../../../constants/routeConfig';

const useStyles = makeStyles((theme) => ({
  statusChip: {
    fontWeight: '600',
    color: 'white',
    backgroundColor: (props) =>
      props.status === 'filled'
        ? '#D9534F'
        : props.status === 'published'
        ? ROUTE_CONFIGS[props.type].theme.light().palette.primary.main
        : '#666',
    margin: '0.25rem',
    textTransform: 'capitalize',
    '&:hover': {
      color: 'black',
    },
  },
}));

const StatusChip = ({ status, type }) => {
  const classes = useStyles({ status, type });

  return (
    <Chip
      className={classes.statusChip}
      size="small"
      label={status}
      component="a"
      clickable
    />
  );
};

export default StatusChip;
