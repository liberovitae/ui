import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import routes from './routes';
import { AnalyticsProvider } from 'use-analytics';
import analytics from '../../helpers/analyticsPlugin';
import Navigation from '../Navigation';
import Sidebar from '../Navigation/Sidebar';
import { MuiThemeProvider, useTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import NavLinks from '../Navigation/NavLinks';
import withSession from '../Session/withSession';
import Footer from '../Footer';
import history from '../../constants/history';
import Hero from '../Shared/Hero';
import Loading from '../Shared/Loading';
import BoxTemplate from '../Shared/Box';
import Backdrop from '../Shared/Backdrop';
import FAB from '../Shared/FAB';
import themePicker from './Themes/ThemePicker';
import Quicksearch from '../Navigation/Quicksearch';
import { SnackbarProvider } from 'notistack';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const App = ({ session, refetch }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const routeList = routes({ refetch, session, history, location });

  return (
    <AnalyticsProvider instance={analytics}>
      <MuiThemeProvider theme={themePicker()}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: matches ? 'top' : 'bottom',
            horizontal: 'left',
          }}
          maxSnack={3}
        >
          <CssBaseline />

          <Hero />
          <Quicksearch />
          <Backdrop />

          <Router history={history}>
            <LastLocationProvider>
              <Navigation
                history={history}
                refetch={refetch}
                session={session}
              />
              <Sidebar navLinks={NavLinks(session)} />
              <BoxTemplate>
                <Switch location={location}>
                  {routeList.map((route, index) => {
                    const {
                      Component,
                      props,
                      path,
                      exact,
                      suspense,
                    } = route;
                    if (suspense) {
                      return (
                        <Route key={index} exact={exact} path={path}>
                          <Suspense fallback={<Loading />}>
                            <Component {...props} />
                          </Suspense>
                        </Route>
                      );
                    }
                    return (
                      <Route key={index} exact={exact} path={path}>
                        <Component {...props} />
                      </Route>
                    );
                  })}
                </Switch>
                <FAB history={history} />
              </BoxTemplate>
            </LastLocationProvider>

            <Footer />
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </AnalyticsProvider>
  );
};

export default withSession(App);
