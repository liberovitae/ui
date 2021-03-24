import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
}));

const LogoAvatar = ({ name, logo }) => {
  const classes = useStyles();
  return (
    <Avatar
      component="span"
      className={classes.avatar}
      alt={name}
      src={logo ? `${logo}` : null}
    />
  );
};

export default LogoAvatar;
