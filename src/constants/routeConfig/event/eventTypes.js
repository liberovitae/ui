import { useIntl } from 'react-intl';

const venueTypes = () => {
  const intl = useIntl();

  return [
    intl.formatMessage({ id: 'eventTypes.music' }),
    intl.formatMessage({ id: 'eventTypes.arts' }),
    intl.formatMessage({ id: 'eventTypes.film' }),
    intl.formatMessage({ id: 'eventTypes.books' }),
    intl.formatMessage({ id: 'eventTypes.fashion' }),
    intl.formatMessage({ id: 'eventTypes.food' }),
    intl.formatMessage({ id: 'eventTypes.festivals' }),
    intl.formatMessage({ id: 'eventTypes.charities' }),
    intl.formatMessage({ id: 'eventTypes.sports' }),
    intl.formatMessage({ id: 'eventTypes.nightlife' }),
    intl.formatMessage({ id: 'eventTypes.kids' }),
    intl.formatMessage({ id: 'eventTypes.other' }),
  ];
};

export default venueTypes;
