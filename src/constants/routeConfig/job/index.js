import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import { blue, blueDark } from '../../../features/App/Themes';
import INITIAL_SEARCH_STATE from '../../initialSearch';
import { JOBS, JOB_BASE } from '../../routes';
import jobTypes from './jobTypes';
import { queryParamGenerate } from '../../../helpers/queryParams';
import { WorkOutlineOutlined } from '@material-ui/icons';

export default {
  tabIndex: 2,
  type: 'job',
  hasDates: false,
  nextPage: 2,
  hasTab: true,
  requiresParent: true,
  hasImage: false,
  parentType: 'company',
  Icon: WorkOutlineOutlined,
  theme: { colour: 'blue', light: blue, dark: blueDark },
  routes: {
    base: JOB_BASE,
    landing: JOBS,
  },
  defaultSiteHeader: <FormattedMessage id="job.site_header" />,
  types: jobTypes,
  searchVar: window.location.pathname.startsWith(JOB_BASE)
    ? makeVar(queryParamGenerate(INITIAL_SEARCH_STATE))
    : makeVar(INITIAL_SEARCH_STATE),
};
