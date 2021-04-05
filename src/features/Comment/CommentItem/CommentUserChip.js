import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

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
  <Link to={`/u/${username}`}>
    <Tooltip title={`${username}'s profile`}>
      <Chip
        avatar={
          <Avatar
            alt={username}
            src={avatar || '/images/avatars/default_avatar.svg'}
          />
        }
        label={username}
        className={classes.chip}
        variant={variant}
      />
    </Tooltip>
  </Link>
);

export default withStyles(styles)(UserChip);
