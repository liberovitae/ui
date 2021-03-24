import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import withAuthorization from '../../Session/withAuthorization';
import VenueForm from './VenueForm';
import Loading from '../../Shared/Loading';
import { GET_VENUE } from './queries';

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
  logo: '',
  status: 'draft',
};

const VenueCreate = ({ session, history }) => {
  const localItem = JSON.parse(localStorage.getItem('venue'));
  const [venue, setVenue] = useState(localItem || INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const [getVenue, { data }] = useLazyQuery(GET_VENUE, {
    fetchPolicy: 'network-only',
    onCompleted: ({ venue }) => setVenue(venue),
    onError: () =>
      enqueueSnackbar(
        <FormattedMessage id="post_venue.load_failure_snackbar" />,
        { variant: 'error' },
      ),
  });

  useEffect(() => {
    hero({
      title: <FormattedMessage id="post_venue.hero.title" />,
      subtitle: <FormattedMessage id="post_venue.hero.subtitle" />,
    });

    slug && getVenue({ variables: { slug: slug } });

    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if (venue.userId !== session.me.id) {
  //     enqueueSnackbar('Not venue owner', { variant: 'error' });
  //     return history.push(routes.LANDING);
  //   }
  // }, [venue]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setVenue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFile = (name, fileName) => {
    setVenue((prevState) => ({
      ...prevState,
      [name]: fileName,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      localStorage.setItem('venue', JSON.stringify(venue));
      history.push(history.location.pathname + '/preview');
    } catch (err) {
      console.log(err);
    }
  };

  if (!loading) {
    return (
      <VenueForm
        venue={venue}
        onChange={onChange}
        onSubmit={onSubmit}
        userId={session.me.id}
        handleFile={handleFile}
      />
    );
  }
  return <Loading />;
};

export default withAuthorization((session) => session && session.me)(
  VenueCreate,
);
