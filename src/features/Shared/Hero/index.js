import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import ExploreIcon from '@material-ui/icons/Explore';
import {
  makeStyles,
  useTheme,
  lighten,
  darken,
} from '@material-ui/core/styles';
import { Typography, Fade } from '@material-ui/core';
import { routeConfig, hero } from '../../../constants/globalVars';
import { objCompare } from '../../../helpers';
import { useReactiveVar } from '@apollo/client';
import ParticleBackground from './ParticleBackground';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    marginBottom: '2rem',
    minHeight: '175px',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? lighten(theme.palette.background.default, 0.06)
        : darken(theme.palette.background.default, 0.01),
  },
  subtitle: {
    backgroundColor:
      theme.palette.type === 'dark'
        ? lighten(theme.palette.background.default, 0.06)
        : darken(theme.palette.background.default, 0.01),
    fontSize: '1.3rem',
    marginTop: '2rem',
  },
  flag: {
    marginLeft: '0.5rem',
    width: '2rem',
    height: '2rem',
    verticalAlign: 'bottom',
  },
  exploreIcon: {
    verticalAlign: 'bottom',
    height: '2rem',
    width: '2rem',
    marginLeft: '0.3rem',
  },
  container: {
    zIndex: 10,
  },
}));

const Hero = React.memo(
  ({ title, subtitle, country }) => {
    const reactiveHero = useReactiveVar(hero);
    const theme = useTheme();
    const classes = useStyles();
    const heroRoot = document.getElementById('heroRoot');

    if (title || reactiveHero?.title) {
      return (
        <Fade in>
          <div
            id="heroRoot"
            style={{
              marginTop: objCompare(
                routeConfig().searchVar(),
                routeConfig().INITIAL_STATE,
              )
                ? '4rem'
                : '6rem',
            }}
            className={classes.root}
          >
            <div className={classes.container}>
              <ParticleBackground
                routeConfig={routeConfig}
                theme={theme}
                heroRoot={heroRoot}
              />

              <div className={classes.container}>
                <Typography className={classes.title} variant="h4">
                  {title || reactiveHero?.title}
                </Typography>

                <Typography className={classes.subtitle}>
                  {subtitle || reactiveHero?.subtitle}

                  {country?.length === 2 ||
                  reactiveHero?.country?.length === 2 ? (
                    <ReactCountryFlag
                      countryCode={country || reactiveHero?.country}
                      svg
                      className={classes.flag}
                      title={country}
                    />
                  ) : country || reactiveHero?.country ? (
                    <ExploreIcon
                      color="primary"
                      className={classes.exploreIcon}
                    />
                  ) : null}
                </Typography>
              </div>
            </div>
          </div>
        </Fade>
      );
    }
    return '';
  },
  (prevProps, nextProps) => {
    if (prevProps !== nextProps) return false;
    return true;
  },
);

export default Hero;
