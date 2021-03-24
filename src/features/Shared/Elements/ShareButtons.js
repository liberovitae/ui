import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { IconButton } from '@material-ui/core';
import {
  Twitter,
  Telegram,
  Facebook,
  Email,
} from '@material-ui/icons';

const ShareButtons = ({ title }) => {
  const intl = useIntl();

  return (
    <>
      <FormattedMessage id="job_detail.share_buttons.text" />:
      <a
        href={`https://twitter.com/intent/tweet/?text=${title}&url=${window.location}/`}
      >
        <IconButton color="primary">
          <Twitter />
        </IconButton>
      </a>
      <a
        href={`https://t.me/share/url?url=${window.location}&text=${title}`}
      >
        <IconButton color="primary">
          <Telegram />
        </IconButton>
      </a>
      <a
        href={`https://facebook.com/sharer/sharer.php?u=${window.location}`}
      >
        <IconButton color="primary">
          <Facebook />
        </IconButton>
      </a>
      <a
        href={`mailto:?subject=${title}&body=Job via ${intl.formatMessage(
          { id: 'site.name' },
        )} - ${window.location}`}
      >
        <IconButton color="primary">
          <Email />
        </IconButton>
      </a>
    </>
  );
};

export default ShareButtons;
