import React from 'react';
import { Typography } from '@material-ui/core';
import { siteHeader, routeConfig } from '../../constants/globalVars';
import { useReactiveVar } from '@apollo/client';
import { objCompare } from '../../helpers';

const SiteHeader = React.memo(
  ({}) => {
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const reactiveSearch = useReactiveVar(
      reactiveRouteConfig.searchVar,
    );
    const reactiveHeader = useReactiveVar(siteHeader);

    return (
      <Typography
        style={{
          marginTop: !objCompare(
            reactiveSearch,
            reactiveRouteConfig.INITIAL_STATE,
          )
            ? '4rem'
            : '2rem',
          padding: '0.5rem',
        }}
        variant="h5"
      >
        {reactiveHeader}
      </Typography>
    );
  },
  (prevProps, nextProps) => {},
);

export default SiteHeader;
