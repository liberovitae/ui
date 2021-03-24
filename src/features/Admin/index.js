import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  BLOG_POST,
  ADMIN_BLOGS,
  ADMIN_USERS,
  ADMIN,
} from '../../constants/routes';
import { Grid } from '@material-ui/core';
import BlogForm from '../Blog/BlogForm/BlogForm';
import Dashboard from './Dashboard';
import withAuthorization from '../Session/withAuthorization';
import BlogList from './Blogs/BlogList';
import UserList from './Users/index';
import Menu from './Menu';

const AdminPage = ({}) => {
  return (
    <Grid container spacing={3}>
      <Menu />
      <Grid item style={{ width: '100%' }} md={9}>
        <Switch>
          <Route exact path={BLOG_POST}>
            <BlogForm />
          </Route>

          <Route exact path={ADMIN}>
            <Dashboard />
          </Route>

          <Route exact path={ADMIN_BLOGS}>
            <BlogList />
          </Route>

          <Route exact path={ADMIN_USERS}>
            <UserList />
          </Route>
        </Switch>
      </Grid>
    </Grid>
  );
};

export default withAuthorization(
  (session) => session && session.me && session.me.role === 'ADMIN',
)(AdminPage);
