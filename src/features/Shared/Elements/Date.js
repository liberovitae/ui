import React from 'react';
import { Grid } from '@material-ui/core';
import { Event, AccessTime, DoubleArrow } from '@material-ui/icons';
import dayjs from 'dayjs';

const Date = ({ dates }) => {
  const startDate = dayjs(dates?.start).format('ddd, MMM D');
  const endDate = dayjs(dates?.end).format('ddd, MMM D');
  const startTime = dayjs(dates?.start).format('HH:mm');
  const endTime = dayjs(dates?.end).format('HH:mm');

  const sameDate = startDate === endDate;

  return (
    <Grid
      container
      style={{ marginTop: '0.25rem' }}
      // alignItems="center"
    >
      <Grid item xs={12}>
        <Event
          fontSize="small"
          style={{
            verticalAlign: 'text-top',
            marginRight: '0.2rem',
          }}
        />
        {startDate}
        <AccessTime
          fontSize="small"
          style={{
            verticalAlign: 'text-top',
            marginRight: '0.2rem',
            marginLeft: '0.4rem',
          }}
        />
        {startTime}

        <DoubleArrow
          color="primary"
          fontSize="small"
          style={{
            verticalAlign: 'text-top',
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
          }}
        />
        {!sameDate && (
          <>
            <Event
              fontSize="small"
              style={{
                verticalAlign: 'text-top',

                marginRight: '0.2rem',
              }}
            />
            {endDate}
          </>
        )}
        <AccessTime
          fontSize="small"
          style={{
            verticalAlign: 'text-top',
            marginLeft: !sameDate ? '0.4rem' : 0,
            marginRight: '0.2rem',
          }}
        />
        {endTime}
      </Grid>
    </Grid>
  );
};
export default Date;
