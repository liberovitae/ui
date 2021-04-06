import { useIntl } from 'react-intl';

const companyTypes = () => {
  const intl = useIntl();

  return [
    intl.formatMessage({ id: 'companyTypes.hospitality' }),
    intl.formatMessage({ id: 'companyTypes.trades' }),
    intl.formatMessage({ id: 'companyTypes.services' }),
    intl.formatMessage({ id: 'companyTypes.arts' }),
    intl.formatMessage({ id: 'companyTypes.health' }),
    intl.formatMessage({ id: 'companyTypes.management' }),
    intl.formatMessage({ id: 'companyTypes.manufacturing' }),
    intl.formatMessage({ id: 'companyTypes.engineering' }),
    intl.formatMessage({ id: 'companyTypes.finance' }),
    intl.formatMessage({ id: 'companyTypes.misc' }),
  ];
};

export default companyTypes;
