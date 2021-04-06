import React from 'react';
import { routeConfig } from '../../../constants/globalVars';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as ROUTE_CONFIGS from '../../../constants/routeConfig';
const useStyles = makeStyles((theme) => ({
  chip: {
    fontWeight: '600',
    color: 'white',
    marginTop: '0.3rem',
    backgroundColor: '#666',
    textTransform: 'capitalize',
    display: 'inline-grid',
    '&:hover': {
      backgroundColor: (props) =>
        props.type
          ? ROUTE_CONFIGS[props.type]?.theme.light().palette.primary
              .main
          : theme.palette.type === 'light'
          ? theme.palette.primary.light
          : theme.palette.primary.dark,
    },
  },
}));

const TypeChip = ({ text, type, featured }) => {
  const classes = useStyles({ type });
  const { searchVar } = routeConfig();

  return (
    <Chip
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        !featured &&
          searchVar({
            ...searchVar(),
            types: [
              ...searchVar().types.filter(
                (prevType) => prevType !== text,
              ),
              text,
            ],
          });
      }}
      className={classes.chip}
      key={Text}
      size="small"
      label={featured ? 'featured' : text}
      clickable={!featured}
    />
  );
};

export default TypeChip;
