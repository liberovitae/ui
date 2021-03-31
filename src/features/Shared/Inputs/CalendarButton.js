import React from 'react';
import { Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Today } from '@material-ui/icons';
// import { routeConfig } from '../../../constants/globalVars';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateDayJSUtils from '@date-io/dayjs';

const useStyles = makeStyles((theme) => ({
  input: {
    width: 0,
    '&::before': {
      borderBottom: 0,
    },
  },
}));

const CalendarButton = React.memo(
  ({ reactiveRouteConfig, dates }) => {
    const classes = useStyles();

    const handleChange = (date) => {
      reactiveRouteConfig.searchVar({
        ...reactiveRouteConfig.searchVar(),
        dates: {
          start: date,
          end: date,
        },
      });
    };

    return (
      <Grow in>
        <MuiPickersUtilsProvider utils={DateDayJSUtils}>
          <KeyboardDatePicker
            animateYearScrolling
            ampm={false}
            autoOk
            required
            name="dateStart"
            variant="inline"
            disableToolbar
            InputProps={{
              className: classes.input,
              endAdornment: <Today />,
            }}
            value={dates?.start}
            onChange={(e) => handleChange(e)}
          />
        </MuiPickersUtilsProvider>
      </Grow>
    );
  },
);

export default CalendarButton;
