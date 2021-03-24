import React from 'react';
import { Zoom, useScrollTrigger } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import {
  quickSearch,
  filterSearch,
  routeConfig,
} from '../../../constants/globalVars';
import { isDetailSearch } from '../../../helpers';

const style = {
  position: 'fixed',
  bottom: '50px',
  right: '30px',
  zIndex: 99,
};

const FAB = () => {
  const trigger = useScrollTrigger({ threshold: 250 });

  return (
    <Zoom in={trigger && !filterSearch().show && !quickSearch().show}>
      <div role="presentation" style={style}>
        <Fab
          color="primary"
          onClick={() => {
            if (isDetailSearch(routeConfig().searchVar())) {
              return filterSearch({
                show: !filterSearch().show,
                autofocus: false,
              });
            }

            return quickSearch({
              show: !quickSearch().show,
              autofocus: true,
            });
          }}
          title="Search"
          variant="round"
          aria-label="Search"
        >
          <Search />
        </Fab>
      </div>
    </Zoom>
  );
};

export default FAB;
