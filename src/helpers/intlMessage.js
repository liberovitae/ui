import React from 'react';
import { injectIntl } from 'react-intl';

const Msg = injectIntl(({ id, intl }) => intl.formatMessage({ id }));

const msg = ({ id }) => <Msg id={id} />;

export default msg;
