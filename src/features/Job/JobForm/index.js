import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { LANDING } from '../../../constants/routes';
import withAuthorization from '../../Session/withAuthorization';
import JobForm from './JobForm';
import Loading from '../../Shared/Loading';
import { GET_JOB } from './queries';
import { hero } from '../../../constants/globalVars';

const INITIAL_STATE = {
  id: '',
  title: '',
  location: {
    name: '',
    lat: '',
    lon: '',
  },
  description: '',
  url: '',
  regions: [],
  types: [],
  tags: [],
  status: 'draft',
};

const JobCreate = ({ session, history, refetch }) => {
  const [job, setJob] = useState(INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const localJob = JSON.parse(localStorage.getItem('job'));

  const [getJob, { data }] = useLazyQuery(GET_JOB, {
    fetchPolicy: 'network-only',
    onCompleted: ({ job }) => setJob(job),
    onError: () =>
      enqueueSnackbar(
        <FormattedMessage id="post_job.load_failure_snackbar" />,
        {
          variant: 'error',
        },
      ),
  });

  useEffect(() => {
    if (job.status === 'filled') {
      enqueueSnackbar(
        <FormattedMessage id="post_job.job_filled_snackbar" />,
        {
          variant: 'warning',
        },
      );
    }

    hero({
      title: <FormattedMessage id="post_job.hero.title" />,
      subtitle: <FormattedMessage id="post_job.hero.subtitle" />,
    });

    slug && getJob({ variables: { slug: slug } });

    localJob && setJob({ ...localJob });

    setLoading(false);
  }, [history, session]);

  useEffect(() => {
    if (job.company && job.company.id !== session.me.company.id) {
      enqueueSnackbar('Not job owner', { variant: 'error' });
      return history.push(LANDING);
    }
  }, [job]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setJob((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(session.me.company);
      localStorage.setItem('job', JSON.stringify(job));
      refetch();
      history.push(history.location.pathname + '/preview');
    } catch (error) {}
  };

  if (!loading) {
    return (
      <JobForm
        job={job}
        onChange={onChange}
        onSubmit={onSubmit}
        userId={session.me.id}
        company={session.me.company}
      />
    );
  }
  return <Loading />;
};

export default withAuthorization((session) => session && session.me)(
  JobCreate,
);
