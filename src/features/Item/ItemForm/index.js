import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero, routeConfig } from '../../../constants/globalVars';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import withAuthorization from '../../Session/withAuthorization';
import ItemForm from './ItemForm';
import Loading from '../../Shared/Loading';

const INITIAL_STATE = {
  id: '',
  title: '',
  location: {
    name: '',
    lat: '',
    lon: '',
  },
  description: '',
  dateStart: new Date(),
  dateEnd: new Date(),
  url: '',
  types: [],
  tags: [],
  logo: '',
  status: 'draft',
};

const ItemCreate = ({ session, history }) => {
  const localItem = JSON.parse(localStorage.getItem(type));
  const [item, setItem] = useState(localItem || INITIAL_STATE);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const { slug, type } = useParams();

  const [getItem, { data }] = useLazyQuery(
    routeConfig().queries.get,
    {
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const key = Object.keys(data);
        setItem(data[key]);
      },
      onError: () =>
        enqueueSnackbar(
          <FormattedMessage
            id="post_form.load_failure_snackbar"
            values={{ type }}
          />,
          { variant: 'error' },
        ),
    },
  );

  useEffect(() => {
    hero({
      title: (
        <FormattedMessage
          id="post_form.hero.title"
          values={{ type }}
        />
      ),
      subtitle: (
        <FormattedMessage
          id="post_form.hero.subtitle"
          values={{ type }}
        />
      ),
    });

    console.log(slug);

    slug && getItem({ variables: { slug: slug } });

    setLoading(false);
  }, []);

  // useEffect(() => {
  //   if (event.userId !== session.me.id) {
  //     enqueueSnackbar('Not event owner', { variant: 'error' });
  //     return history.push(routes.LANDING);
  //   }
  // }, [event]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFile = (name, fileName) => {
    setItem((prevState) => ({
      ...prevState,
      [name]: fileName,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        type,
        JSON.stringify({ ...item, dateStart, dateEnd }),
      );
      history.push(history.location.pathname + '/preview');
    } catch (err) {
      console.log(err);
    }
  };

  if (!loading) {
    return (
      <ItemForm
        type={type}
        item={item}
        onChange={onChange}
        onSubmit={onSubmit}
        userId={session.me.id}
        handleFile={handleFile}
        dateStart={dateStart}
        dateEnd={dateEnd}
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
      />
    );
  }
  return <Loading />;
};

export default withAuthorization((session) => session && session.me)(
  ItemCreate,
);
