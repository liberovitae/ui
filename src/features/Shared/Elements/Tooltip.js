import React from 'react';
import { useIntl } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import isEmail from 'validator/es/lib/isEmail';

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const ToolTip = ({ children, url, type }) => {
  const intl = useIntl();
  const urlIsEmail = isEmail(url);

  const messages = {
    job: intl.formatMessage(
      { id: 'job_detail.apply_button_tooltip' },
      { url: url },
    ),
    venue: intl.formatMessage(
      { id: 'venue_detail.contact_button_tooltip' },
      { url: url },
    ),
  };

  return (
    <BootstrapTooltip arrow title={urlIsEmail ? messages[type] : ''}>
      {children}
    </BootstrapTooltip>
  );
};

export default ToolTip;
