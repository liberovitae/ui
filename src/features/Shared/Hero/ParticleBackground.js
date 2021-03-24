import React from 'react';
import Particles from 'react-tsparticles';
import { lighten, darken } from '@material-ui/core/styles';
import { objCompare } from '../../../helpers';

const ParticleBackground = ({ theme, routeConfig, heroRoot }) => (
  <Particles
    style={{
      marginTop: objCompare(
        routeConfig().searchVar(),
        routeConfig().INITIAL_STATE,
      )
        ? '4rem'
        : '6rem',
      zIndex: -2,
      top: 0,
      left: 0,
      position: 'absolute',
      minHeight: '175px',
    }}
    id="tsparticles"
    height={`${(heroRoot && heroRoot.offsetHeight) || 200}px`}
    options={{
      autoPlay: true,
      background: {
        minHeight: '50vh',
        color: {
          value:
            theme.palette.type === 'dark'
              ? lighten(theme.palette.background.default, 0.06)
              : darken(theme.palette.background.default, 0.01),
        },
        image: '',
        position: '50% 50%',
        repeat: 'no-repeat',
        size: 'cover',
        opacity: 1,
      },
      backgroundMask: {
        composite: 'destination-out',
        cover: {
          color: {
            value: '#fff',
          },
          opacity: 1,
        },
        enable: false,
      },
      fullScreen: {
        enable: false,
        zIndex: -2,
      },
      detectRetina: true,
      fpsLimit: 60,
      infection: {
        cure: false,
        delay: 0,
        enable: false,
        infections: 0,
        stages: [],
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onDiv: {
            selectors: [],
            enable: false,
            mode: [],
            type: 'circle',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
            parallax: {
              enable: false,
              force: 2,
              smooth: 10,
            },
          },
          resize: true,
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            speed: 1,
          },
          bounce: {
            distance: 200,
          },
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          connect: {
            distance: 80,
            links: {
              opacity: 0.5,
            },
            radius: 60,
          },
          grab: {
            distance: 400,
            links: {
              blink: false,
              consent: false,
              opacity: 1,
            },
          },
          light: {
            area: {
              gradient: {
                start: {
                  value: '#ffffff',
                },
                stop: {
                  value: '#000000',
                },
              },
              radius: 1000,
            },
            shadow: {
              color: {
                value: '#000000',
              },
              length: 2000,
            },
          },
          push: {
            quantity: 4,
          },
          remove: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            speed: 1,
          },
          slow: {
            factor: 3,
            radius: 200,
          },
          trail: {
            delay: 1,
            quantity: 1,
          },
        },
      },
      manualParticles: [],
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: false,
        },
      },
      particles: {
        bounce: {
          horizontal: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 1,
          },
          vertical: {
            random: {
              enable: false,
              minimumValue: 0.1,
            },
            value: 1,
          },
        },
        collisions: {
          bounce: {
            horizontal: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
            vertical: {
              random: {
                enable: false,
                minimumValue: 0.1,
              },
              value: 1,
            },
          },
          enable: false,
          mode: 'bounce',
        },
        color: {
          value: theme.palette.primary.main,
          opacity: 0.5,
          animation: {
            enable: false,
            speed: 20,
            sync: true,
          },
        },
        life: {
          count: 0,
          delay: {
            random: {
              enable: false,
              minimumValue: 0,
            },
            value: 0,
            sync: false,
          },
          duration: {
            random: {
              enable: false,
              minimumValue: 0.0001,
            },
            value: 0,
            sync: false,
          },
        },
        links: {
          blink: false,
          color: {
            value: theme.palette.primary.light,
          },
          consent: false,
          distance: 100,
          enable: true,
          frequency: 1,
          opacity: 0.2,
          shadow: {
            blur: 5,
            color: {
              value: '#00ff00',
            },
            enable: false,
          },
          triangles: {
            enable: false,
            frequency: 1,
          },
          width: 1,
          warp: false,
        },
        move: {
          angle: {
            offset: 45,
            value: 90,
          },
          attract: {
            enable: false,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
          direction: 'none',
          distance: 0,
          enable: true,
          gravity: {
            acceleration: 9.81,
            enable: false,
            maxSpeed: 50,
          },
          noise: {
            delay: {
              random: {
                enable: false,
                minimumValue: 0,
              },
              value: 0,
            },
            enable: false,
          },
          outModes: {
            default: 'out',
            bottom: 'out',
            left: 'out',
            right: 'out',
            top: 'out',
          },
          random: false,
          size: false,
          speed: 1,
          straight: false,
          trail: {
            enable: false,
            length: 10,
            fillColor: {
              value: '#000000',
            },
          },
          vibrate: false,
          warp: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
            factor: 1000,
          },
          limit: 40,
          value: 50,
        },
        opacity: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 0.5,
          animation: {
            destroy: 'none',
            enable: false,
            minimumValue: 0.1,
            speed: 3,
            startValue: 'random',
            sync: false,
          },
        },
        reduceDuplicates: true,
        rotate: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
          animation: {
            enable: false,
            speed: 0,
            sync: false,
          },
          direction: 'clockwise',
          path: false,
        },
        shadow: {
          blur: 0,
          color: {
            value: '#000000',
          },
          enable: false,
          offset: {
            x: 0,
            y: 0,
          },
        },
        shape: {
          options: {
            polygon: {
              nb_sides: 5,
            },
            star: {
              nb_sides: 5,
            },
            image: {
              src: 'https://particles.js.org/images/github.svg',
              width: 100,
              height: 100,
            },
            images: {
              src: 'https://particles.js.org/images/github.svg',
              width: 100,
              height: 100,
            },
          },
          type: 'circle',
        },
        size: {
          random: {
            enable: true,
            minimumValue: 1,
          },
          value: 3,
          animation: {
            destroy: 'none',
            enable: false,
            minimumValue: 0.1,
            speed: 20,
            startValue: 'random',
            sync: false,
          },
        },
        stroke: {
          width: 0,
        },
        twinkle: {
          lines: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
          particles: {
            enable: false,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: false,
      themes: [],
    }}
  />
);

export default ParticleBackground;
