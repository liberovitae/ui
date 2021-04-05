import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero, routeConfig } from '../../../constants/globalVars';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import withAuthorization from '../../Session/withAuthorization';
import PostForm from './PostForm';
import Loading from '../../Shared/Loading';
import { GET_POST } from '../queries';
import { GET_MY_POSTS } from '../../Account/Dashboard/queries';
import INITIAL_STATE from '../../../constants/initialPost';
import * as ROUTE_CONFIGS from '../../../constants/routeConfig';

const PostCreate = React.memo(({ session, history }) => {
  const { slug, type } = useParams();
  const localPost = JSON.parse(localStorage.getItem(type));
  const [post, setPost] = useState(localPost || INITIAL_STATE);
  const [parents, setParents] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);

  const { data } = useQuery(GET_POST, {
    skip: !slug,
    fetchPolicy: 'network-only',
    variables: { slug: slug },
    onCompleted: (data) => {
      const key = Object.keys(data);
      setPost(data[key]);
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

  const { data: parentData, loading: parentLoading } = useQuery(
    GET_MY_POSTS,
    {
      skip: !routeConfig().requiresParent,
      variables: { type: routeConfig().parentType },
      onCompleted: (data) => {
        const key = Object.keys(data);
        setParents(data[key]);
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

    if (post) {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    if (
      !parentLoading &&
      routeConfig().requiresParent &&
      !parents?.length
    ) {
      history.push(`/${routeConfig().parentType}/create`);
      // routeConfig(ROUTE_CONFIGS[routeConfig().parentType]);
      enqueueSnackbar(`Create a ${routeConfig().parentType} first`, {
        variant: 'warning',
      });
      return;
    }
  }, [parents, window.location]);

  const handleChecked = (e) => {
    const { name, checked } = e.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDates = async (date, type) => {
    setPost((prevState) => ({
      ...prevState,
      dates: {
        ...prevState.dates,
        [type]: date,
      },
    }));
  };

  const handleFile = (name, fileName) => {
    setPost((prevState) => ({
      ...prevState,
      [name]: fileName,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(type, JSON.stringify(post));
      history.push(history.location.pathname + '/preview');
    } catch (err) {
      console.log(err);
    }
  };

  console.log(post);

  if (!loading) {
    return (
      <PostForm
        type={type}
        post={post}
        parents={parents}
        onChange={onChange}
        onSubmit={onSubmit}
        userId={session.me.id}
        handleFile={handleFile}
        handleChecked={handleChecked}
        handleDates={handleDates}
        session={session}
      />
    );
  }
  return <Loading />;
});

export default withAuthorization((session) => session && session.me)(
  PostCreate,
);
