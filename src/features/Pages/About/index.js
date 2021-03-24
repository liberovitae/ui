import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { withTheme } from '@material-ui/styles';
import { Typography, Grid, Box, Button } from '@material-ui/core';
import { hero } from '../../../constants/globalVars';
import {
  JOB_POST,
  LANDING,
  SAVED,
  ALERTS,
  VENUE_POST,
} from '../../../constants/routes';

const About = ({}) => {
  useEffect(() => {
    hero({
      title: 'About',
      subtitle:
        'Our mission is to provide the go-to, no-nonsense, fast and lean social connectivity platform.',
    });
  }, []);

  return (
    <Box mt={4} p={1}>
      <Grid container justify="center" alignItems="center">
        <Grid item md={10}>
          <Typography paragraph variant="h5">
            Our focus
          </Typography>
          <Typography>
            <strong>
              Provide a direct link between individuals and
              businesses/venues:
            </strong>{' '}
            Open listings are shown as standard or featured (top)
            listings with an email address or a direct link to a
            website. We don’t intercept the flow by capturing
            communications or other data and publish 99%
            high-quality/spam-free listings from around the world.
            <br />
            <br />
            <strong>Simple but effective tools:</strong> We provide an
            easy way to{' '}
            <Link to={VENUE_POST}> quickly list venues</Link> and{' '}
            <Link to={JOB_POST}>vacancies</Link> in front of a highly
            targeted and interested audience. No unnecessary
            subscriptions, no complex pricing tables and no strings
            attached. Besides the <Link to={LANDING}>search</Link> and{' '}
            <Link to={SAVED}> save/apply later</Link> features, there
            is the option to set up{' '}
            <Link to={ALERTS}>free alerts</Link> to get notified about
            new listings matching your criteria.
            <br />
            <br />
            <strong> Respect for privacy and security: </strong>
            We only use internal tools for anonymized visitor
            statistics. Search is free from external trackers, ads,
            pop-ups, recaptchas or any other intrusive nonsense. We
            also don’t collect user data to sell to companies,
            marketers or recruiting agencies.
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

export default withTheme(About);
