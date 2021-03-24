import React from 'react';
import { FormattedMessage } from 'react-intl';
import { routeConfig } from '../../constants/globalVars';
import {
  NotificationsOutlined,
  FavoriteBorderOutlined,
  PostAddOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
} from '@material-ui/icons';
import {
  JOB_POST,
  ACCOUNT,
  LOGIN,
  ALERTS,
  SAVED,
  ADMIN,
  VENUE_POST,
} from '../../constants/routes';

const NavLinks = (session) => {
  if (routeConfig().type === 'job') {
    return [
      {
        title: <FormattedMessage id="navbar.alerts" />,
        path: ALERTS,
        icon: <NotificationsOutlined />,
      },
      {
        title: <FormattedMessage id="navbar.saved_jobs" />,
        path: SAVED,
        icon: <FavoriteBorderOutlined />,
      },
      {
        title: <FormattedMessage id="navbar.post_job_button" />,
        path: JOB_POST,
        icon: <PostAddOutlined />,
      },

      session?.me
        ? {
            title: <FormattedMessage id="navbar.account_button" />,
            path: ACCOUNT,
            icon: <AccountCircleOutlined />,
          }
        : {
            title: <FormattedMessage id="common.login" />,
            path: LOGIN,
            icon: <AccountCircleOutlined />,
          },

      session?.me?.role === 'ADMIN'
        ? {
            title: <FormattedMessage id="navbar.admin_button" />,
            path: ADMIN,
            icon: <SettingsOutlined />,
          }
        : false,
    ];
  }

  if (routeConfig().type === 'venue') {
    return [
      {
        title: <FormattedMessage id="navbar.alerts" />,
        path: ALERTS,
        icon: <NotificationsOutlined />,
      },
      {
        title: <FormattedMessage id="navbar.saved_venues" />,
        path: SAVED,
        icon: <FavoriteBorderOutlined />,
      },
      {
        title: <FormattedMessage id="navbar.post_venue_button" />,
        path: VENUE_POST,
        icon: <PostAddOutlined />,
      },

      session?.me
        ? {
            title: <FormattedMessage id="navbar.account_button" />,
            path: ACCOUNT,
            icon: <AccountCircleOutlined />,
          }
        : {
            title: <FormattedMessage id="common.login" />,
            path: LOGIN,
            icon: <AccountCircleOutlined />,
          },
      session?.me?.role === 'ADMIN'
        ? {
            title: <FormattedMessage id="navbar.admin_button" />,
            path: ADMIN,
            icon: <SettingsOutlined />,
          }
        : false,
    ];
  }
};

export default NavLinks;
