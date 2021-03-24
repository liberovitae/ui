import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CKEditorInput from '../../Shared/Inputs/CKEditor';
import ButtonInput from '../../Shared/Inputs/Button';
import TextInput from '../../Shared/Inputs/Text';
import AutoCompleteInput from '../../Shared/Inputs/AutoComplete';
import Loading from '../../Shared/Loading';
import jobTypes from '../../../constants/jobTypes';
import Regions from '../../../constants/regions';
import LocationInput from '../../Shared/Inputs/Location';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';

const useStyles = makeStyles({
  urlInput: {
    width: '100%',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
});

const JobForm = ({
  onLocation,
  onChange,
  onSubmit,
  job,
  company,
}) => {
  const classes = useStyles();
  const {
    types,
    title,
    location,
    description,
    tags,
    regions,
    url,
  } = job;

  job.company = company;

  useEffect(() => {
    return function cleanValidation() {
      ValidatorForm.removeValidationRule('isEmailorURL');
    };
  }, []);

  ValidatorForm.addValidationRule('isEmailorURL', (value) => {
    if (isEmail(value) || isURL(value)) {
      return true;
    }
    return false;
  });

  if (job) {
    return (
      <Fade in>
        <div>
          <Typography variant="h5" paragraph gutterBottom>
            <FormattedMessage id="post_job.header" />
          </Typography>
          <ValidatorForm onSubmit={onSubmit}>
            <Box pb={2}>
              <TextInput
                required
                name="title"
                value={title}
                label={
                  <FormattedMessage id="post_job.title.input_label" />
                }
                onChange={onChange}
              />
            </Box>
            <Box pb={2}>
              <AutoCompleteInput
                data={jobTypes()}
                value={types}
                onChange={onChange}
                name="types"
                required
                label={
                  <FormattedMessage id="post_job.types.input_label" />
                }
                helperText={
                  <FormattedMessage id="post_job.types.input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <LocationInput
                label={
                  <FormattedMessage id="post_job.location.input_label" />
                }
                onLocation={onLocation}
                location={location}
                onChange={onChange}
                required
                helperText={
                  <FormattedMessage id="post_job.location.input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <AutoCompleteInput
                data={Regions()}
                value={regions}
                onChange={onChange}
                name="regions"
                label={
                  <FormattedMessage id="post_job.regions.input_label" />
                }
                required
                helperText={
                  <FormattedMessage id="post_job.regions.input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <CKEditorInput
                value={description}
                id="description"
                name="description"
                label={
                  <FormattedMessage id="post_job.description.input_label" />
                }
                required
                onChange={onChange}
                helperText={
                  <FormattedMessage id="post_job.description.input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <AutoCompleteInput
                data={[]}
                value={tags}
                onChange={onChange}
                name="tags"
                label={
                  <FormattedMessage id="post_job.tags.input_label" />
                }
                required
                helperText={
                  <FormattedMessage id="post_job.tags.input_helperText" />
                }
                freeSolo={tags.length <= 9 ? true : false}
                getOptionDisabled={(options) =>
                  tags.length <= 9 ? true : false
                }
              />
            </Box>
            <Box pb={2}>
              <FormControl required className={classes.urlInput}>
                <FormLabel>
                  <FormattedMessage id="post_job.url.input_label" />
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
                    <FormattedMessage id="post_job.url.input_helperText" />
                  }
                />
              </FormControl>
            </Box>
            <ButtonInput
              text={<FormattedMessage id="post_job.button" />}
            />
          </ValidatorForm>
        </div>
      </Fade>
    );
  }
  return <Loading />;
};

export default JobForm;
