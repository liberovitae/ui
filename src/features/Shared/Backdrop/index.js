import React from 'react';
import { Backdrop } from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { backdrop } from '../../../constants/globalVars';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  backdrop: {
    zIndex: 20,
    backdropFilter: 'blur(3px) saturate(0.25)',
  },
});

const BackDrop = ({ children }) => {
  const classes = useStyles();
  const reactiveBackdrop = useReactiveVar(backdrop);
  return (
    <Backdrop
      className={classes.backdrop}
      open={reactiveBackdrop}
      onClick={() => {
        backdrop(false);
      }}
    />
  );
};

export default BackDrop;
