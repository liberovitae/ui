import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {
  JOBS,
  VENUES,
  JOB_BASE,
  VENUE_BASE,
  JOB_POST,
  VENUE_POST,
  MY_JOBS,
  MY_VENUES,
} from '../constants/routes';
import jobTypes from './jobTypes';
import venueTypes from './venueTypes';
import INITIAL_JOB_STATE from '../constants/initialJobSearch';
import INITIAL_VENUE_STATE from '../constants/initialVenueSearch';
import { queryParamGenerate } from '../helpers/queryParams';
import {
  purple,
  purpleDark,
  blue,
  blueDark,
} from '../features/App/Themes';
import {
  GET_PAGINATED_JOBS,
  CREATE_JOB,
  UPDATE_JOB,
  GET_JOB,
} from '../features/Job/queries';
import {
  GET_PAGINATED_VENUES,
  CREATE_VENUE,
  UPDATE_VENUE,
  GET_VENUE,
} from '../features/Venue/queries';
import {
  GET_ME_JOBS,
  GET_ME_VENUES,
} from '../features/Account/Dashboard/queries';

export default {
  venue: {
    tabIndex: 0,
    type: 'venue',
    theme: { colour: 'purple', light: purple, dark: purpleDark },
    routes: {
      base: VENUE_BASE,
      landing: VENUES,
      post: VENUE_POST,
      myListings: MY_VENUES,
    },
    queries: {
      getPaginated: GET_PAGINATED_VENUES,
      get: GET_VENUE,
      myListings: GET_ME_VENUES,
      create: CREATE_VENUE,
      update: UPDATE_VENUE,
      nextPage: 2,
    },
    defaultSiteHeader: <FormattedMessage id="venue.site_header" />,
    types: venueTypes,
    INITIAL_STATE: INITIAL_VENUE_STATE,
    searchVar: window.location.pathname.startsWith(VENUE_BASE)
      ? makeVar(queryParamGenerate())
      : makeVar(INITIAL_VENUE_STATE),
    detailedSearch: false,
  },
  job: {
    tabIndex: 1,
    type: 'job',
    theme: { colour: 'blue', light: blue, dark: blueDark },
    routes: {
      base: JOB_BASE,
      landing: JOBS,
      post: JOB_POST,
      myListings: MY_JOBS,
    },
    queries: {
      getPaginated: GET_PAGINATED_JOBS,
      myListings: GET_ME_JOBS,
      get: GET_JOB,
      create: CREATE_JOB,
      update: UPDATE_JOB,
      nextPage: 2,
    },
    defaultSiteHeader: <FormattedMessage id="job.site_header" />,
    types: jobTypes,
    INITIAL_STATE: INITIAL_JOB_STATE,
    searchVar: window.location.pathname.startsWith(JOB_BASE)
      ? makeVar(queryParamGenerate())
      : makeVar(INITIAL_JOB_STATE),
    detailedSearch: false,
  },
};
