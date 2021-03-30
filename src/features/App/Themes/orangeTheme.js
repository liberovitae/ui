import {
  createMuiTheme,
  lighten,
  darken,
} from '@material-ui/core/styles';

const orangeTheme = () => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#ca6e35',
      },
      secondary: {
        main: '#D9534F',
      },
      background: {
        default: '#fff',
      },
      type: 'light',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
          a: {
            color: '#ca6e35',
            '&:hover': {
              color: lighten('#ca6e35', 0.2),
            },
          },
          overflow: {
            overflow: 'hidden',
          },
          '*::-webkit-scrollbar': {
            width: '0.4em',
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#ca6e35',
            outline: '1px solid slategrey',
          },
          scrollbar: {
            backgroundColor: lighten('#ca6e35', 0.2),
          },
        },
      },
      MuiFormLabel: {
        root: {
          marginBottom: '0.5rem',
          verticalAlign: 'middle',
        },
      },
      MuiDropzoneArea: {
        root: {
          border: 'solid 1px !important',
          borderColor: 'rgba(0, 0, 0, 0.3) !important',
          minHeight: 'unset !important',
        },
        textContainer: {
          color: 'rgba(0, 0, 0, 0.3) !important',
        },
        icon: { color: 'rgba(0, 0, 0, 0.3) !important' },
      },

      MuiDropzonePreviewList: {
        root: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
      },
    },
  });
};

export default orangeTheme;
