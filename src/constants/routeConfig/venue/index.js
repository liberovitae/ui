import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {
  VENUES,
  VENUE_BASE,
  VENUE_POST,
  MY_VENUES,
} from '../../routes';
import venueTypes from './venueTypes';
import {
  GET_PAGINATED_VENUES,
  CREATE_VENUE,
  UPDATE_VENUE,
  GET_VENUE,
} from './queries';
import INITIAL_VENUE_SEARCH_STATE from './initialVenueSearch';
import { GET_ME_VENUES } from '../../../features/Account/Dashboard/queries';
import { purple, purpleDark } from '../../../features/App/Themes';
import { queryParamGenerate } from '../../../helpers/queryParams';

export default {
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
  INITIAL_SEARCH_STATE: INITIAL_VENUE_SEARCH_STATE,
  searchVar: window.location.pathname.startsWith(VENUE_BASE)
    ? makeVar(queryParamGenerate())
    : makeVar(INITIAL_VENUE_SEARCH_STATE),
};
