import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import {
  // JOB_POST,
  DONATE,
  LANDING,
  TERMS,
  // MY_JOBS,
  // VENUE_POST,
} from '../../../constants/routes';
import { hero } from '../../../constants/globalVars';

const FAQ = ({}) => {
  useEffect(() => {
    hero({
      title: 'FAQ',
      subtitle: 'Frequently Asked Questions',
    });
  }, []);

  return (
    <Box p={1}>
      <Grid container justify="center" alignItems="center">
        <Grid item md={10}>
          <Typography variant="h5" gutterBottom>
            How can I add a featured listing?
          </Typography>
          <Typography paragraph>
            We provide featured listings for those kind enough to
            support us through donations. If you want your post listed
            as featured, <Link to={'#'}>create a job ad</Link> or{' '}
            <Link to={'#'}>a venue</Link>, then make a{' '}
            <Link to={DONATE}>donation</Link> and send an email to{' '}
            <a href="mailto:mail@liberovitae.com">
              mail@liberovitae.com
            </a>{' '}
            with information about the job listing you want featured
            and how/where/when you made the donation.
          </Typography>
          <Typography variant="h5" gutterBottom>
            How long are jobs listed for?
          </Typography>
          <Typography paragraph>
            Jobs are listed publicly for 2 months, after that they
            will expire and not longer display on listings. They will
            still be accessible via a direct link and will finally be
            removed from the database after 6 months. You can manage
            your <Link to={MY_JOBS}>job ads here</Link>.
          </Typography>
          <Typography variant="h5" gutterBottom>
            A company/venue has discriminated against me, what should
            I do?
          </Typography>
          <Typography paragraph>
            Please contact us at{' '}
            <a href="mailto:reports@liberovitae.com">
              reports@liberovitae.com
            </a>{' '}
            with as much information (emails, letters, screenshots,
            etc) you have to raise a case with our reports team. Your
            report will only apply to the{' '}
            <Link to={TERMS}>terms & conditions</Link> of this website
            and we unfortuantely cannot offer you legal advice.
          </Typography>
          <br />
          <Link to={LANDING}>
            <Button color="primary">
              <FormattedMessage id="common.back" />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQ;
