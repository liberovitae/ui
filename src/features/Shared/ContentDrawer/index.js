import React from 'react';
import { useReactiveVar } from '@apollo/client';
import Drawer from '@material-ui/core/Drawer';
import { contentDrawer } from '../../../constants/globalVars';
import BoxTemplate from '../Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    height: '100%',
    paddingBottom: '2rem',
  },
  container: {
    paddingBottom: '2rem',
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
    padding: '0.5rem',
  },
}));

const ContentDrawer = ({ children }) => {
  const classes = useStyles();
  const reactiveContentDrawer = useReactiveVar(contentDrawer);

  return (
    <Drawer
      style={{ zIndex: 0 }}
      anchor={'top'}
      className={classes.drawer}
      disableEnforceFocus
      open={reactiveContentDrawer.show}
      onClose={() => {
        contentDrawer({ show: false });
      }}
    >
      <BoxTemplate>
        <div className={classes.container}>{children}</div>
      </BoxTemplate>
    </Drawer>
  );
};

export default ContentDrawer;
