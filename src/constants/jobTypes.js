import { useIntl } from 'react-intl';

const jobTypes = () => {
  const intl = useIntl();

  return [
    intl.formatMessage({ id: 'jobTypes.full' }),
    intl.formatMessage({ id: 'jobTypes.part' }),
    intl.formatMessage({ id: 'jobTypes.temp' }),
    intl.formatMessage({ id: 'jobTypes.contract' }),
    intl.formatMessage({ id: 'jobTypes.freelance' }),
    intl.formatMessage({ id: 'jobTypes.volunteer' }),
  ];
};

export default jobTypes;
