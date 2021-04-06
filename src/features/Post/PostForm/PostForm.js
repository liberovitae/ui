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
  FormControlLabel,
  FormLabel,
  Fade,
  Grid,
  Switch,
  Grow,
  FormHelperText,
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
  Select,
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

const PostForm = React.memo(
  ({
    handleFile,
    onLocation,
    onChange,
    onSubmit,
    post,
    parents,
    handleDates,
    handleChecked,
    handleParentDetails,
    type,
  }) => {
    const {
      types,
      title,
      location,
      text,
      tags,
      url,
      image,
      parent,
      dates,
      commentsEnabled,
      detailsAsParent,
    } = post;

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

    if (post) {
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
            <Box pb={2}>
              {routeConfig().requiresParent && (
                <Select
                  data={parents}
                  required
                  label={`${type} ${routeConfig().parentType}`}
                  name="parent"
                  value={parent?.id || parents?.[0]?.id}
                  onChange={onChange}
                />
              )}
            </Box>

            <ValidatorForm onSubmit={onSubmit}>
              <>
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

                {parent && routeConfig().requiresParent && (
                  <Box
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                    pb={2}
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={detailsAsParent}
                          onChange={handleParentDetails}
                          name="detailsAsParent"
                          color="primary"
                        />
                      }
                      label={`Details are the same as ${
                        routeConfig().parentType
                      }`}
                    />
                    <FormHelperText style={{ margin: 0 }}>
                      (image, location, tags, url)
                    </FormHelperText>
                  </Box>
                )}

                {routeConfig().hasDates && (
                  <MuiPickersUtilsProvider utils={DateDayJSUtils}>
                    <FormLabel
                      className={classes.header}
                      component={Typography}
                      style={{ marginBottom: 0 }}
                      required
                    >
                      {type} dates
                    </FormLabel>
                    <Grid
                      style={{
                        paddingTop: '0.5rem',
                        paddingBottom: '1rem',
                      }}
                      container
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item xs={5}>
                        <DateTimePicker
                          animateYearScrolling
                          ampm={false}
                          autoOk
                          required
                          inputVariant="outlined"
                          name="dateStart"
                          variant="inline"
                          disableToolbar
                          label="Start date/time"
                          disablePast
                          InputProps={{
                            endAdornment: <CalendarTodayIcon />,
                          }}
                          value={dates.start}
                          onChange={(date) =>
                            handleDates(date, 'start')
                          }
                        />
                      </Grid>

                      <Grid
                        item
                        style={{ textAlign: 'center' }}
                        xs={1}
                      >
                        <DoubleArrowIcon
                          fontSize="small"
                          color="primary"
                        />
                      </Grid>

                      <Grid
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                        item
                        xs={5}
                      >
                        <DateTimePicker
                          animateYearScrolling
                          ampm={false}
                          autoOk
                          required
                          inputVariant="outlined"
                          name="dateEnd"
                          variant="inline"
                          label="End date/time"
                          disableToolbar
                          minDate={dates.start || new Date()}
                          InputProps={{
                            endAdornment: <CalendarTodayIcon />,
                          }}
                          value={dates.end}
                          onChange={(date) =>
                            handleDates(date, 'end')
                          }
                        />
                      </Grid>
                    </Grid>
                  </MuiPickersUtilsProvider>
                )}

                {routeConfig().hasImage && !detailsAsParent && (
                  <Grow in>
                    <Box pb={2}>
                      <Upload
                        name="image"
                        id="image"
                        label={
                          <FormattedMessage id="post_form.upload_input_label" />
                        }
                        value={image}
                        handleFile={handleFile}
                      />
                    </Box>
                  </Grow>
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

                {!detailsAsParent && (
                  <Grow in>
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
                  </Grow>
                )}

                <Box pb={2}>
                  <CKEditor
                    value={text}
                    id="text"
                    name="text"
                    label={
                      <FormattedMessage id="post_form.text.input_label" />
                    }
                    required
                    onChange={onChange}
                    helperText={
                      <FormattedMessage
                        id="post_form.text.input_helperText"
                        values={{ type }}
                      />
                    }
                  />
                </Box>
                {!detailsAsParent && (
                  <Grow in>
                    <div>
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
                            errorMessages={[
                              'Must be an email address or URL',
                            ]}
                            value={url}
                            helperText={
                              <FormattedMessage id="post_form.url.input_helperText" />
                            }
                          />
                        </FormControl>
                      </Box>
                    </div>
                  </Grow>
                )}

                {routeConfig().hasComments && (
                  <Box pb={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={commentsEnabled}
                          onChange={handleChecked}
                          name="commentsEnabled"
                          color="primary"
                        />
                      }
                      label="Enable comments"
                    />
                  </Box>
                )}

                <Button
                  text={<FormattedMessage id="post_form.button" />}
                />
              </>
            </ValidatorForm>
          </div>
        </Fade>
      );
    }
    return <Loading />;
  },
);

export default PostForm;
