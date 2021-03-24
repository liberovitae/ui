import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { Link } from 'react-router-dom';
import { Typography, Fade } from '@material-ui/core';
import {
  MY_JOBS,
  COMPANY_EDIT,
  SETTINGS,
  MY_VENUES,
  ALERTS,
} from '../../../constants/routes';
import { BackButton } from '../../Shared/Elements';
const Dashboard = ({}) => {
  useEffect(() => {
    hero({
      title: <FormattedMessage id="account.dashboard.hero.title" />,
      subtitle: (
        <FormattedMessage id="account.dashboard.hero.subtitle" />
      ),
    });
  }, []);

  return (
    <Fade in>
      <div>
        <Typography gutterBottom variant="h5">
          <FormattedMessage id="account.dashboard.title" />
        </Typography>
        <Typography>
          From here you can manage your{' '}
          <Link to={MY_JOBS}>job ads</Link>, edit your
          <Link to={COMPANY_EDIT}> company info</Link>,{' '}
          <Link to={MY_VENUES}>edit your venues</Link>,{' '}
          <Link to={ALERTS}>manage your alerts</Link> and{' '}
          <Link to={SETTINGS}>
            change your password and account details
          </Link>
          . <br />
          <br />
          <BackButton />
        </Typography>
      </div>
    </Fade>
  );
};

export default Dashboard;
