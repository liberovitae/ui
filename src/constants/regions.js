import { useIntl } from 'react-intl';

const regionsList = () => {
  const intl = useIntl();

  return [
    intl.formatMessage({ id: 'regions.africa' }),
    intl.formatMessage({ id: 'regions.asia' }),
    intl.formatMessage({ id: 'regions.europe' }),
    intl.formatMessage({ id: 'regions.middleeast' }),
    intl.formatMessage({ id: 'regions.namerica' }),
    intl.formatMessage({ id: 'regions.samerica' }),
    intl.formatMessage({ id: 'regions.remote' }),
  ];
};

export default regionsList;
