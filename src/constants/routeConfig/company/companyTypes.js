import { useIntl } from 'react-intl';

const companyTypes = () => {
  const intl = useIntl();

  return [
    intl.formatMessage({ id: 'venueTypes.retail' }),
    intl.formatMessage({ id: 'venueTypes.hospitality' }),
    intl.formatMessage({ id: 'venueTypes.services' }),
    intl.formatMessage({ id: 'venueTypes.arts' }),
    intl.formatMessage({ id: 'venueTypes.health' }),
    intl.formatMessage({ id: 'venueTypes.misc' }),
  ];
};

export default companyTypes;
