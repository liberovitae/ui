import React from 'react';
import { routeConfig } from '../../../constants/globalVars';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chip: {
    fontWeight: '600',
    color: 'white',
    marginTop: '0.3rem',
    backgroundColor: '#666',
    textTransform: 'capitalize',
    display: 'inline-grid',
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
      color: 'white',
    },
  },
}));

const TypeChip = ({ type, featured }) => {
  const classes = useStyles();
  const { searchVar } = routeConfig();

  return (
    <Chip
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        !featured &&
          searchVar({
            ...searchVar(),
            types: [
              ...searchVar().types.filter(
                (prevType) => prevType !== type,
              ),
              type,
            ],
          });
      }}
      className={classes.chip}
      key={type}
      size="small"
      label={featured ? 'featured' : type}
      clickable={!featured}
    />
  );
};

export default TypeChip;
