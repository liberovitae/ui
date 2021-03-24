import React, { Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import { useReactiveVar } from '@apollo/client';
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
import { routeConfig, darkTheme } from '../../constants/globalVars';
import routes from './routes';
import themePicker from './Themes/ThemePicker';
import Quicksearch from '../Navigation/Quicksearch';

const NotFoundPage = React.lazy(() => import('../Shared/404'));

const App = React.memo(
  ({ session, refetch }) => {
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const reactiveDarkTheme = useReactiveVar(darkTheme);

    const theme = useTheme();

    const routeList = routes({ refetch, session, history, location });

    const scrollbar = document.getElementById('scrollBar');

    if (scrollbar)
      scrollbar.style.backgroundColor = reactiveRouteConfig.theme.light().palette.primary.light;

    return (
      <AnalyticsProvider instance={analytics}>
        <MuiThemeProvider
          theme={themePicker({
            reactiveRouteConfig,
            reactiveDarkTheme,
            theme,
          })}
        >
          <CssBaseline />

          <Hero />
          <Quicksearch />
          <Router history={history}>
            <LastLocationProvider>
              <Navigation
                history={history}
                refetch={refetch}
                session={session}
              />
              <Backdrop />
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

                  <Route>
                    <Suspense fallback={<Loading />}>
                      <NotFoundPage />
                    </Suspense>
                  </Route>
                </Switch>
                <FAB history={history} />
              </BoxTemplate>
            </LastLocationProvider>

            <Footer />
          </Router>
        </MuiThemeProvider>
      </AnalyticsProvider>
    );
  },
  (prevProps, nextProps) => {},
);

export default withSession(App);
