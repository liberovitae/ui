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
import UploadInput from '../../Shared/Inputs/Upload';
import CKEditorInput from '../../Shared/Inputs/CKEditor';
import ButtonInput from '../../Shared/Inputs/Button';
import TextInput from '../../Shared/Inputs/Text';
import AutoCompleteInput from '../../Shared/Inputs/AutoComplete';
import Loading from '../../Shared/Loading';
import venueTypes from '../../../constants/venueTypes';
import Regions from '../../../constants/regions';
import LocationInput from '../../Shared/Inputs/Location';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';

const VenueForm = ({
  handleFile,
  onLocation,
  onChange,
  onSubmit,
  venue,
}) => {
  const {
    types,
    title,
    location,
    description,
    tags,
    regions,
    url,
    logo,
  } = venue;

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

  if (venue) {
    return (
      <Fade in>
        <div>
          <Typography variant="h5" paragraph gutterBottom>
            <FormattedMessage id="post_venue.header" />
          </Typography>
          <ValidatorForm onSubmit={onSubmit}>
            <Box pb={2}>
              <TextInput
                required
                name="title"
                value={title}
                label={
                  <FormattedMessage id="post_venue.title.input_label" />
                }
                onChange={onChange}
              />
            </Box>
            <Box pb={2}>
              <UploadInput
                name="logo"
                id="logo"
                label={
                  <FormattedMessage id="company_form.upload_input_label" />
                }
                value={logo}
                handleFile={handleFile}
              />
            </Box>
            <Box pb={2}>
              <AutoCompleteInput
                data={venueTypes()}
                value={types}
                onChange={onChange}
                name="types"
                required
                label={
                  <FormattedMessage id="post_venue.types.input_label" />
                }
                helperText={
                  <FormattedMessage id="post_venue.types.input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <LocationInput
                label={
                  <FormattedMessage id="post_venue.location.input_label" />
                }
                onLocation={onLocation}
                location={location}
                onChange={onChange}
                required
                helperText={
                  <FormattedMessage id="post_venue.location.input_helperText" />
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
                  <FormattedMessage id="post_venue.regions.input_label" />
                }
                required
                helperText={
                  <FormattedMessage id="post_venue.regions.input_helperText" />
                }
              />
            </Box>
            <Box pb={2}>
              <CKEditorInput
                value={description}
                id="description"
                name="description"
                label={
                  <FormattedMessage id="post_venue.description.input_label" />
                }
                required
                onChange={onChange}
                helperText={
                  <FormattedMessage id="post_venue.description.input_helperText" />
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
                  <FormattedMessage id="post_venue.tags.input_label" />
                }
                required
                helperText={
                  <FormattedMessage id="post_venue.tags.input_helperText" />
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
                  <FormattedMessage id="post_venue.url.input_label" />
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
                    <FormattedMessage id="post_venue.url.input_helperText" />
                  }
                />
              </FormControl>
            </Box>
            <ButtonInput
              text={<FormattedMessage id="post_venue.button" />}
            />
          </ValidatorForm>
        </div>
      </Fade>
    );
  }
  return <Loading />;
};

export default VenueForm;
