import React from 'react';
import { makeVar } from '@apollo/client';
import { FormattedMessage } from 'react-intl';
import {
  GET_PAGINATED_JOBS,
  CREATE_JOB,
  UPDATE_JOB,
  GET_JOB,
} from './queries';
import { blue, blueDark } from '../../../features/App/Themes';
import INITIAL_JOB_SEARCH_STATE from './initialJobSearch';
import INITIAL_STATE from './initialJob';
import { JOBS, JOB_BASE, JOB_POST, MY_JOBS } from '../../routes';
import jobTypes from './jobTypes';
import { GET_ME_JOBS } from '../../../features/Account/Dashboard/queries';
import { queryParamGenerate } from '../../../helpers/queryParams';

export default {
  tabIndex: 2,
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
  INITIAL_STATE: INITIAL_STATE,
  INITIAL_SEARCH_STATE: INITIAL_JOB_SEARCH_STATE,
  searchVar: window.location.pathname.startsWith(JOB_BASE)
    ? makeVar(queryParamGenerate(INITIAL_JOB_SEARCH_STATE))
    : makeVar(INITIAL_JOB_SEARCH_STATE),
};
