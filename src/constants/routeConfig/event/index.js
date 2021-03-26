import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {
  EVENTS,
  EVENT_POST,
  EVENT_BASE,
  MY_EVENTS,
} from '../../routes';
import eventTypes from './eventTypes';
import INITIAL_EVENT_SEARCH_STATE from './initialEventSearch';
import { queryParamGenerate } from '../../../helpers/queryParams';
import { orange, orangeDark } from '../../../features/App/Themes';
import { GET_ME_EVENTS } from '../../../features/Account/Dashboard/queries';
import {
  GET_PAGINATED_EVENTS,
  CREATE_EVENT,
  UPDATE_EVENT,
  GET_EVENT,
} from './queries';

export default {
  tabIndex: 1,
  type: 'event',
  theme: { colour: 'orange', light: orange, dark: orangeDark },
  routes: {
    base: EVENT_BASE,
    landing: EVENTS,
    post: EVENT_POST,
    myListings: MY_EVENTS,
  },
  queries: {
    getPaginated: GET_PAGINATED_EVENTS,
    get: GET_EVENT,
    myListings: GET_ME_EVENTS,
    create: CREATE_EVENT,
    update: UPDATE_EVENT,
    nextPage: 2,
  },
  defaultSiteHeader: <FormattedMessage id="event.site_header" />,
  types: eventTypes,
  INITIAL_SEARCH_STATE: INITIAL_EVENT_SEARCH_STATE,
  searchVar: window.location.pathname.startsWith(EVENT_BASE)
    ? makeVar(queryParamGenerate())
    : makeVar(INITIAL_EVENT_SEARCH_STATE),
  detailedSearch: false,
};
