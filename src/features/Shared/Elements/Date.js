import React from 'react';
import { Grid } from '@material-ui/core';
import { Event, AccessTime, DoubleArrow } from '@material-ui/icons';
import dayjs from 'dayjs';

const Date = ({ dates, listItem }) => {
  const startDate = dayjs(dates.start).format('ddd, MMM D');
  const endDate = dayjs(dates.end).format('ddd, MMM D');
  const startTime = dayjs(dates.start).format('HH:mm');
  const endTime = dayjs(dates.end).format('HH:mm');

  if (startDate === endDate)
    return (
      <Grid container style={{ marginTop: '0.5rem' }} spacing={1}>
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
              marginLeft: '0.4rem',
              marginRight: '0.25rem',
            }}
          />
          {startTime}

          <DoubleArrow
            color="primary"
            fontSize="small"
            style={{
              verticalAlign: 'text-top',
              marginLeft: '0.25rem',
              marginRight: '0.25rem',
            }}
          />
          <AccessTime
            fontSize="small"
            style={{
              verticalAlign: 'text-top',
              marginRight: '0.25rem',
            }}
          />
          {endTime}
        </Grid>
      </Grid>
    );

  return (
    <Grid
      container
      style={{ marginTop: '0.5rem' }}
      alignItems="center"
    >
      <Grid item>
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
      </Grid>

      <DoubleArrow
        color="primary"
        fontSize="small"
        style={{
          marginLeft: '0.5rem',
          marginRight: '0.5rem',
        }}
      />
      <Grid item>
        <Event
          fontSize="small"
          style={{
            verticalAlign: 'text-top',

            marginRight: '0.2rem',
          }}
        />
        {endDate}
        <AccessTime
          fontSize="small"
          style={{
            verticalAlign: 'text-top',
            marginLeft: '0.4rem',
            marginRight: '0.2rem',
          }}
        />
        {endTime}
      </Grid>
    </Grid>
  );
};
export default Date;
