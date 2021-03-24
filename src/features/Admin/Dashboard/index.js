import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { Typography, Fade } from '@material-ui/core';
import { BackButton } from '../../Shared/Elements';
const AdminDashboard = ({}) => {
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
          Here lies admin tools . <br />
          <br />
          <BackButton />
        </Typography>
      </div>
    </Fade>
  );
};

export default AdminDashboard;
