import React from 'react';
import { Button } from '@material-ui/core';

const MorePostsButton = ({
  classes,
  limit,
  fetchMore,
  children,
  filter,
  reactiveRouteConfig,
  setMoreLoading,
}) => (
  <Button
    type="button"
    className={classes.morePostsButton}
    variant="outlined"
    onClick={() => {
      setMoreLoading(true);
      fetchMore({
        variables: {
          filter: filter,
          cursor: reactiveRouteConfig.nextPage,
          limit,
        },
        onError: () => setMoreLoading(false),
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          const key = Object.keys(fetchMoreResult)[0];

          reactiveRouteConfig.nextPage =
            fetchMoreResult[key].pageInfo.nextPage;

          setMoreLoading(false);

          return {
            [key]: {
              ...fetchMoreResult[key],
              edges: [
                ...previousResult[key].edges,
                ...fetchMoreResult[key].edges,
              ],
            },
          };
        },
      });
    }}
  >
    {children}
  </Button>
);

export default MorePostsButton;
