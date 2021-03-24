import React from 'react';
import { Button } from '@material-ui/core';
import { useLastLocation } from 'react-router-last-location';
import { LANDING } from '../../../constants/routes';
import { contentDrawer } from '../../../constants/globalVars';
import history from '../../../constants/history';
import { FormattedMessage } from 'react-intl';

const BackButton = () => {
  const lastLocation = useLastLocation();
  return (
    <Button
      onClick={() => {
        contentDrawer().show &&
          contentDrawer({ ...contentDrawer(), show: false });
        lastLocation
          ? history.goBack()
          : history.push({
              pathname: LANDING,
            });
      }}
      color="primary"
    >
      <FormattedMessage id="common.back" />
    </Button>
  );
};

export default BackButton;
