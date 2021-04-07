import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { VENUES, VENUE_BASE } from '../../routes';
import venueTypes from './venueTypes';
import INITIAL_SEARCH_STATE from '../../initialSearch';
import { purple, purpleDark } from '../../../features/App/Themes';
import { queryParamGenerate } from '../../../helpers/queryParams';
import { HomeWorkOutlined } from '@material-ui/icons';

export default {
  tabIndex: 1,
  type: 'venue',
  hasDates: false,
  hasLocation: true,
  nextPage: 2,
  hasTab: true,
  hasComments: true,
  requiresParent: false,
  childType: 'event',
  hasImage: true,
  Icon: HomeWorkOutlined,
  theme: { colour: 'purple', light: purple, dark: purpleDark },
  routes: {
    base: VENUE_BASE,
    landing: VENUES,
  },
  defaultSiteHeader: <FormattedMessage id="venue.site_header" />,
  types: venueTypes,
  searchVar: window.location.pathname.startsWith(VENUE_BASE)
    ? makeVar(queryParamGenerate(INITIAL_SEARCH_STATE))
    : makeVar(INITIAL_SEARCH_STATE),
};
