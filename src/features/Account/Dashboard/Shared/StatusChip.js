import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  statusChip: {
    fontWeight: '600',
    color: 'white',
    backgroundColor: (props) =>
      props.status === 'filled'
        ? '#D9534F'
        : props.status === 'published'
        ? theme.palette.primary.main
        : '#666',
    margin: '0.25rem',
    textTransform: 'capitalize',
  },
}));

const StatusChip = ({ status }) => {
  const classes = useStyles({ status });

  return (
    <Chip
      className={classes.statusChip}
      size="small"
      label={status}
      component="a"
      href="#chip"
      clickable
    />
  );
};

export default StatusChip;
