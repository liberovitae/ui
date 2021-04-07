import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { blue, blueDark } from '../../../features/App/Themes';
import INITIAL_SEARCH_STATE from '../../initialSearch';
import { JOBS, COMPANY_BASE, JOB_BASE } from '../../routes';
import companyTypes from './companyTypes';
import { queryParamGenerate } from '../../../helpers/queryParams';
import { BusinessOutlined } from '@material-ui/icons';

export default {
  tabIndex: 2,
  type: 'company',
  hasDates: false,
  hasTab: false,
  requiresParent: false,
  hasLocation: true,
  hasImage: true,
  childType: 'job',
  nextPage: 2,
  Icon: BusinessOutlined,
  theme: { colour: 'blue', light: blue, dark: blueDark },
  routes: {
    base: COMPANY_BASE,
    landing: JOBS,
  },
  defaultSiteHeader: <FormattedMessage id="job.site_header" />,
  types: companyTypes,
  searchVar: window.location.pathname.startsWith(JOB_BASE)
    ? makeVar(queryParamGenerate(INITIAL_SEARCH_STATE))
    : makeVar(INITIAL_SEARCH_STATE),
};
