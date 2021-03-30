import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero, routeConfig } from '../../../constants/globalVars';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import withAuthorization from '../../Session/withAuthorization';
import ItemForm from './ItemForm';
import Loading from '../../Shared/Loading';
import { VENUE_POST } from '../../../constants/routes';

const INITIAL_STATE = routeConfig().INITIAL_STATE;

const ItemCreate = React.memo(({ session, history }) => {
  const localItem = JSON.parse(localStorage.getItem(type));
  const [item, setItem] = useState(localItem || INITIAL_STATE);

  console.log(item.dates);
  const [dateStart, setDateStart] = useState(item?.dates?.start);
  const [dateEnd, setDateEnd] = useState(item?.dates?.end);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const { slug, type } = useParams();

  const { data } = useQuery(routeConfig().queries.get, {
    skip: !slug,
    fetchPolicy: 'network-only',
    variables: { slug: slug },
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
  });

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

    if (type === 'event' && !session?.me?.venues?.length) {
      enqueueSnackbar('Create a venue first', {
        variant: 'warning',
      });
      history.push(VENUE_POST);
    }

    if (item) setLoading(false);
  }, [type]);

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
        JSON.stringify({
          ...item,
          dates: { start: dateStart, end: dateEnd },
        }),
      );
      history.push(history.location.pathname + '/preview');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(item);

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
        session={session}
        setDateStart={setDateStart}
        setDateEnd={setDateEnd}
      />
    );
  }
  return <Loading />;
});

export default withAuthorization((session) => session && session.me)(
  ItemCreate,
);
