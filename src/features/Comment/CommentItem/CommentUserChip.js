import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Chip, Avatar, Tooltip } from '@material-ui/core';

const styles = (theme) => ({
  icon: {
    fontSize: '300px',
  },
  chip: {
    textShadow: 'none',
    cursor: 'pointer',
  },
});

const UserChip = ({ classes, avatar, username, variant }) => (
  <Tooltip title={`${username}'s profile`}>
    <Chip
      avatar={<Avatar alt={username} src={avatar} />}
      label={username}
      className={classes.chip}
      variant={variant}
    />
  </Tooltip>
);

export default withStyles(styles)(UserChip);
