import React from 'react';
import { DateRange, Event, AccessTime } from '@material-ui/icons';
import dayjs from 'dayjs';

const Date = ({ date: isodate }) => {
  const date = dayjs(isodate).format('YYYY-MM-DD');

  return (
    <>
      <Event
        fontSize="small"
        style={{ verticalAlign: 'sub', marginRight: '0.3rem' }}
      />
      {date}
    </>
  );
};

export default Date;
