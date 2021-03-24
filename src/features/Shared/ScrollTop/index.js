import React from 'react';
import { Zoom, useScrollTrigger } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';

const style = {
  position: 'fixed',
  bottom: '50px',
  right: '30px',
  zIndex: 99,
};

export const scrollTop = () => {
  setTimeout(
    () =>
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      }),
    2,
  );
};

const BackToTop = ({ children }) => {
  const trigger = useScrollTrigger({ threshold: 500 });

  return (
    <Zoom in={trigger}>
      <div onClick={scrollTop} role="presentation" style={style}>
        <Fab
          size="medium"
          variant="extended"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUp />
        </Fab>
      </div>
    </Zoom>
  );
};

export default BackToTop;
