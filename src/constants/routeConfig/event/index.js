import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { EVENT_BASE, EVENTS } from '../../routes';
import eventTypes from './eventTypes';
import INITIAL_SEARCH_STATE from '../../initialSearch';
import { queryParamGenerate } from '../../../helpers/queryParams';
import { orange, orangeDark } from '../../../features/App/Themes';

import { EventOutlined } from '@material-ui/icons';

export default {
  tabIndex: 0,
  type: 'event',
  hasDates: true,
  hasComments: true,
  hasLocation: true,
  nextPage: 2,
  requiresParent: true,
  hasImage: true,
  parentType: 'venue',
  Icon: EventOutlined,
  theme: { colour: 'orange', light: orange, dark: orangeDark },
  routes: {
    base: EVENT_BASE,
    landing: EVENTS,
  },
  defaultSiteHeader: <FormattedMessage id="event.site_header" />,
  types: eventTypes,
  searchVar: window.location.pathname.startsWith(EVENT_BASE)
    ? makeVar(queryParamGenerate(INITIAL_SEARCH_STATE))
    : makeVar(INITIAL_SEARCH_STATE),
};
