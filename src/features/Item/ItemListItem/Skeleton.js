import React from 'react';
import { Grid, Fade } from '@material-ui/core';

import Skeleton from '@material-ui/lab/Skeleton';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ItemListSkeleton = React.memo(() => {
  return (
    <Fade in timeout={400}>
      <Grid
        container
        spacing={1}
        style={{ margin: '0.1rem' }}
        direction="row"
      >
        <Grid item xs={2} sm={1}>
          <Skeleton
            style={{ marginTop: '0.5rem' }}
            animation="wave"
            variant="circle"
            height={60}
            width={60}
          />
        </Grid>

        <Grid item xs={9}>
          <Skeleton
            animation="wave"
            variant="text"
            width={getRandomInt(60, 160)}
          />

          <Skeleton
            animation="wave"
            variant="rect"
            width={`${getRandomInt(50, 80)}%`}
            height={getRandomInt(60, 80)}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={getRandomInt(60, 100)}
          />

          <Skeleton
            animation="wave"
            variant="text"
            width={getRandomInt(60, 100)}
          />
        </Grid>

        <Grid item xs={1} style={{ transform: 'rotateY(180deg)' }}>
          <Skeleton animation="wave" variant="text" />

          <Skeleton
            animation="wave"
            variant="text"
            width={getRandomInt(60, 120)}
          />
          <Skeleton
            animation="wave"
            variant="text"
            width={getRandomInt(30, 80)}
          />
        </Grid>
      </Grid>
    </Fade>
  );
});

export default ItemListSkeleton;
