import React from 'react';
import { Chip } from '@material-ui/core';
import { routeConfig } from '../../../constants/globalVars';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: '600',
    padding: 0,
    display: 'inline-grid',
    backgroundColor: 'unset',
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      color: 'white',
    },
  },
}));

const TagChip = ({ tag }) => {
  const classes = useStyles();
  const { searchVar } = routeConfig();
  return (
    <Chip
      className={classes.root}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        searchVar({ ...searchVar(), keywords: tag });
      }}
      key={tag}
      size="small"
      label={tag}
      component="span"
      clickable
    />
  );
};

export default TagChip;
