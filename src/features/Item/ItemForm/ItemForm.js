import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import DateDayJSUtils from '@date-io/dayjs';
import { routeConfig } from '../../../constants/globalVars';
import {
  ValidatorForm,
  TextValidator,
} from 'react-material-ui-form-validator';
import {
  Typography,
  Box,
  FormControl,
  FormLabel,
  Fade,
  Grid,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import {
  Text,
  Button,
  CKEditor,
  Upload,
  Location,
  AutoComplete,
} from '../../Shared/Inputs';
import Loading from '../../Shared/Loading';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const useStyles = makeStyles({
  header: {
    '&::first-letter': {
      textTransform: 'uppercase',
    },
  },
});

const ItemForm = ({
  handleFile,
  onLocation,
  onChange,
  onSubmit,
  item,
  dateStart,
  dateEnd,
  setDateStart,
  setDateEnd,
  type,
}) => {
  const {
    types,
    title,
    location,
    description,
    tags,
    url,
    logo,
  } = item;

  const classes = useStyles();
  const intl = useIntl();

  useEffect(() => {
    return function cleanValidation() {
      ValidatorForm.removeValidationRule('isEmailorURL');
    };
  }, []);

  ValidatorForm.addValidationRule('isEmailorURL', (value) => {
    if (!value) return true;

    if (isEmail(value) || isURL(value)) {
      return true;
    }
    return false;
  });

  if (item) {
    return (
      <Fade in>
        <div>
          <Typography
            className={classes.header}
            variant="h5"
            paragraph
            gutterBottom
          >
            <FormattedMessage
              id="post_form.header"
              values={{ type }}
            />
          </Typography>
          <ValidatorForm onSubmit={onSubmit}>
            <Box pb={2}>
              <Text
                required
                name="title"
                value={title}
                label={
                  <FormattedMessage
                    id="post_form.title.input_label"
                    values={{ type }}
                  />
                }
                onChange={onChange}
              />
            </Box>

            {type === 'event' && (
              <MuiPickersUtilsProvider utils={DateDayJSUtils}>
                <FormLabel>Event dates</FormLabel>
                <Grid
                  style={{
                    marginTop: '1rem',
                    marginBottom: '1rem',
                  }}
                  container
                  alignItems="baseline"
                  justify="space-evenly"
                >
                  <DateTimePicker
                    animateYearScrolling
                    ampm={false}
                    autoOk
                    name="dateStart"
                    variant="inline"
                    disableToolbar
                    label="Start date/time"
                    disablePast
                    InputProps={{
                      endAdornment: <CalendarTodayIcon />,
                    }}
                    value={dateStart}
                    onChange={setDateStart}
                  />
                  <DoubleArrowIcon color="primary" />
                  <DateTimePicker
                    animateYearScrolling
                    ampm={false}
                    autoOk
                    name="dateEnd"
                    variant="inline"
                    label="End date/time"
                    disableToolbar
                    disablePast
                    InputProps={{
                      endAdornment: <CalendarTodayIcon />,
                    }}
                    value={dateEnd}
                    onChange={setDateEnd}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            )}

            {type !== 'job' && (
              <Box pb={2}>
                <Upload
                  name="logo"
                  id="logo"
                  label={
                    <FormattedMessage id="company_form.upload_input_label" />
                  }
                  value={logo}
                  handleFile={handleFile}
                />
              </Box>
            )}

            <Box pb={2}>
              <AutoComplete
                data={routeConfig().types()}
                value={types}
                onChange={onChange}
                name="types"
                required
                label={
                  <FormattedMessage
                    id="post_form.types.input_label"
                    values={{ type }}
                  />
                }
                helperText={
                  <FormattedMessage
                    id="post_form.types.input_helperText"
                    values={{ type }}
                  />
                }
              />
            </Box>
            <Box pb={2}>
              <Location
                label={
                  <FormattedMessage
                    id="post_form.location.input_label"
                    values={{ type }}
                  />
                }
                onLocation={onLocation}
                location={location}
                onChange={onChange}
                required
                placeholder={intl.formatMessage({
                  id: 'post_form.location.input_placeholder',
                })}
                helperText={
                  <FormattedMessage
                    id="post_form.location.input_helperText"
                    values={{ type }}
                  />
                }
              />
            </Box>

            <Box pb={2}>
              <CKEditor
                value={description}
                id="description"
                name="description"
                label={
                  <FormattedMessage id="post_form.description.input_label" />
                }
                required
                onChange={onChange}
                helperText={
                  <FormattedMessage
                    id="post_form.description.input_helperText"
                    values={{ type }}
                  />
                }
              />
            </Box>
            <Box pb={2}>
              <AutoComplete
                data={[]}
                value={tags}
                onChange={onChange}
                name="tags"
                label={
                  <FormattedMessage
                    id="post_form.tags.input_label"
                    values={{ type }}
                  />
                }
                required
                helperText={
                  <FormattedMessage
                    id="post_form.tags.input_helperText"
                    values={{ type }}
                  />
                }
                freeSolo={tags.length <= 9 ? true : false}
                getOptionDisabled={(options) =>
                  tags.length <= 9 ? true : false
                }
              />
            </Box>
            <Box pb={2}>
              <FormControl
                required
                style={{
                  width: '100%',
                  paddingTop: '0.5rem',
                  paddingBottom: '0.5rem',
                }}
              >
                <FormLabel>
                  <FormattedMessage id="post_form.url.input_label" />
                </FormLabel>
                <TextValidator
                  fullWidth
                  onChange={onChange}
                  name="url"
                  required
                  variant="outlined"
                  type="text"
                  validators={['isEmailorURL']}
                  errorMessages={['Must be an email address or URL']}
                  value={url}
                  helperText={
                    <FormattedMessage id="post_form.url.input_helperText" />
                  }
                />
              </FormControl>
            </Box>
            <Button
              text={<FormattedMessage id="post_form.button" />}
            />
          </ValidatorForm>
        </div>
      </Fade>
    );
  }
  return <Loading />;
};

export default ItemForm;
