import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { hero } from '../../../constants/globalVars';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Box, Grid } from '@material-ui/core';
import { CREATE_BLOG, UPDATE_BLOG, GET_BLOG } from '../queries';
import ButtonInput from '../../Shared/Inputs/Button';
import TextInput from '../../Shared/Inputs/Text';
import CKEditorInput from '../../Shared/Inputs/CKEditor';
import { ADMIN } from '../../../constants/routes';
import history from '../../../constants/history';

const INITIAL_STATE = {
  id: '',
  title: '',
  subtitle: '',
  text: '',
  status: 'draft',
};

const BlogForm = ({}) => {
  const { slug } = useParams();
  const [state, setState] = useState(INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    hero({
      title: 'Blog',
      subtitle: 'Create a new blog post',
    });
  }, []);

  const { data, loading } = useQuery(GET_BLOG, {
    skip: !slug,
    variables: { slug: slug },
    onCompleted: ({ blog }) => {
      setState(blog);
    },
  });

  const [mutateBlog] = useMutation(
    state.id ? UPDATE_BLOG : CREATE_BLOG,
    {
      variables: {
        id: state.id,
        input: state,
      },

      onError: (err) =>
        enqueueSnackbar(err.message, {
          variant: 'error',
        }),
      onCompleted: (data) => {
        enqueueSnackbar(
          Object.keys(data)[0] === 'updateJobAlert' ? (
            <FormattedMessage id="blog_form.updated_success_snackbar" />
          ) : (
            <FormattedMessage id="blog_form.created_success_snackbar" />
          ),
          {
            variant: 'success',
          },
        );
        return history.push(ADMIN);
      },
    },
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (event, status) => {
    event.preventDefault();

    delete state.__typename;

    mutateBlog({
      variables: {
        id: state.id,
        input: { ...state, status: status },
      },
    });
  };

  return (
    <>
      <Box pt={2} pb={2}>
        <TextInput
          required
          name="title"
          value={state.title}
          label={<FormattedMessage id="common.title" />}
          onChange={onChange}
        />
      </Box>
      <Box pt={2} pb={2}>
        <TextInput
          name="subtitle"
          value={state.subtitle}
          label={<FormattedMessage id="common.subtitle" />}
          onChange={onChange}
        />
      </Box>
      <Box>
        <CKEditorInput
          value={state.text}
          id="text"
          name="text"
          label={<FormattedMessage id="common.text" />}
          required
          onChange={onChange}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ButtonInput
            onClick={(event) => onSubmit(event, 'draft')}
            variant="outlined"
            text="Save draft"
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonInput
            onClick={(event) => onSubmit(event, 'published')}
            text="Publish"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default BlogForm;
