import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Route, Switch } from 'react-router-dom';
import withAuthorization from '../Session/withAuthorization';
import { Grid, Box, Fade } from '@material-ui/core';
import {
  ACCOUNT,
  COMPANY_CREATE,
  MY_POSTS,
  SAVED,
  SETTINGS,
  POST_SAVE,
  ALERT_CREATE,
  ALERTS,
  ACCOUNT_EDIT,
  ACCOUNT_DELETE,
  PASSWORD_EDIT,
} from '../../constants/routes';
import { scrollTop } from '../Shared/ScrollTop';
import { useParams } from 'react-router-dom';
import Helmet from 'react-helmet';
import Alert from '@material-ui/lab/Alert';
// import CompanyForm from '../Company/CompanyForm';
import Dashboard from './Dashboard/Dashboard';
import AccountMenu from './Dashboard/Menu';
import MyPosts from './Dashboard/MyPosts';
import SavedPosts from './Dashboard/SavedPosts';
import Settings from './Dashboard/Settings';
import SavePost from './Dashboard/SavePost';
import Alerts from './Dashboard/Alerts';
import AlertForm from './Dashboard/AlertForm';
import AccountDelete from './Dashboard/Delete';
import AccountEdit from './Dashboard/Edit';
import PasswordEdit from './Dashboard/Password';

const AccountPage = ({ session, refetch, history }) => {
  const { slug } = useParams();
  const intl = useIntl();
  scrollTop();
  return (
    <Fade in>
      <Grid container spacing={3}>
        <Helmet
          title={`${intl.formatMessage({
            id: 'site.name',
          })} | ${intl.formatMessage({ id: 'common.account' })}`}
          meta={[
            {
              property: 'og:title',
              content: `${intl.formatMessage({
                id: 'site.name',
              })} | ${intl.formatMessage({ id: 'common.account' })}`,
            },
          ]}
        />

        <AccountMenu />
        <Grid style={{ width: '100%' }} item md={9}>
          {session && session.me && !session.me.verified && (
            <Box mb={4}>
              <Alert severity="warning">
                <FormattedMessage id="account.verify.dashboard_warning" />
              </Alert>
            </Box>
          )}
          <Switch>
            <Route exact path={ACCOUNT}>
              <Dashboard />
            </Route>
            {/* <Route exact path={COMPANY_CREATE}>
              <CompanyForm
                refetch={refetch}
                session={session}
                history={history}
                account
              />
            </Route> */}
            <Route exact path={POST_SAVE}>
              <SavePost
                slug={slug}
                refetch={refetch}
                session={session}
              />
            </Route>

            <Route exact path={MY_POSTS}>
              <MyPosts session={session} refetch={refetch} />
            </Route>
            <Route exact path={SAVED}>
              <SavedPosts refetch={refetch} session={session} />
            </Route>
            <Route exact path={SETTINGS}>
              <Settings session={session} refetch={refetch} />
            </Route>

            <Route exact path={ALERT_CREATE}>
              <AlertForm refetch={refetch} session={session} />
            </Route>

            <Route exact path={ALERTS}>
              <Alerts refetch={refetch} session={session} />
            </Route>
            <Route exact path={ACCOUNT_DELETE}>
              <AccountDelete session={session} />
            </Route>
            <Route exact path={ACCOUNT_EDIT}>
              <AccountEdit
                session={session}
                refetch={refetch}
                history={history}
              />
            </Route>
            <Route exact path={PASSWORD_EDIT}>
              <PasswordEdit session={session} />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default withAuthorization((session) => session && session.me)(
  AccountPage,
);
