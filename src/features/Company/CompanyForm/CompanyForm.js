import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Typography, Box, Fade } from '@material-ui/core';
import UploadInput from '../../Shared/Inputs/Upload';
import ButtonInput from '../../Shared/Inputs/Button';
import { CREATE_COMPANY, UPDATE_COMPANY } from './queries';
import Loading from '../../Shared/Loading';
import TextInput from '../../Shared/Inputs/Text';
import { scrollTop } from '../../Shared/ScrollTop';
const CompanyForm = ({
  id,
  title,
  image,
  website,
  tagline,
  twitter,
  linkedin,
  onChange,
  handleFile,
  onSubmit,
  session,
  account,
  refetch,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const [mutateCompany, { data, loading, error }] = useMutation(
    session?.me?.company ? UPDATE_COMPANY : CREATE_COMPANY,
    {
      variables: {
        id: id,
        title: title,
        image: image,
        website: website,
        tagline: tagline,
        twitter: twitter,
        linkedin: linkedin,
      },

      onCompleted: (data) => {
        if (account) {
          if (data && Object.values(data)[0]) {
            enqueueSnackbar(
              <FormattedMessage id="company_form.update.success_snackbar" />,
              { variant: 'success' },
            );
            refetch();
            scrollTop();
            return;
          }
        }
      },
      onError: (err) =>
        enqueueSnackbar(err.message, { variant: 'error' }),
    },
  );

  if (!loading) {
    return (
      <Fade in>
        <Box p={account ? 0 : 1}>
          {account && (
            <Typography paragraph gutterBottom>
              <FormattedMessage id="company_form.description" />
            </Typography>
          )}
          <Typography variant="h5" paragraph>
            <FormattedMessage id="company_form.title" />
          </Typography>
          <form
            onSubmit={(event) =>
              onSubmit(event, mutateCompany, account)
            }
          >
            <Box pb={1}>
              <TextInput
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                required
                label={
                  <FormattedMessage id="company_form.name_input_label" />
                }
              />
            </Box>
            <Box pb={1}>
              <UploadInput
                name="image"
                id="image"
                label={
                  <FormattedMessage id="company_form.upload_input_label" />
                }
                value={image}
                handleFile={handleFile}
              />
            </Box>

            <Box pb={2}>
              <TextInput
                value={website}
                id="website"
                name="website"
                onChange={onChange}
                label={
                  <FormattedMessage id="company_form.website_input_label" />
                }
              />
            </Box>

            <Box pb={2}>
              <TextInput
                value={tagline}
                name="tagline"
                id="tagline"
                onChange={onChange}
                label={
                  <FormattedMessage id="company_form.tagline_input_label" />
                }
              />
            </Box>

            <Box pb={2}>
              <TextInput
                value={twitter}
                name="twitter"
                id="twitter"
                onChange={onChange}
                label={
                  <FormattedMessage id="company_form.twitter_input_label" />
                }
              />
            </Box>

            <Box pb={2}>
              <TextInput
                value={linkedin}
                id="linkedin"
                name="linkedin"
                onChange={onChange}
                label={
                  <FormattedMessage id="company_form.linkedin_input_label" />
                }
              />
            </Box>

            <ButtonInput
              text={
                account ? (
                  <FormattedMessage id="company_form.button_account" />
                ) : (
                  <FormattedMessage id="company_form.button" />
                )
              }
            />
          </form>
        </Box>
      </Fade>
    );
  }

  return <Loading />;
};

export default CompanyForm;
