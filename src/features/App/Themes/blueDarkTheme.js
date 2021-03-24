import { createMuiTheme, lighten } from '@material-ui/core/styles';
const blueDarkTheme = () => {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#488ecc',
      },
      secondary: {
        main: '#D9534F',
      },
      background: {
        default: '#000',
      },
      type: 'dark',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            WebkitFontSmoothing: 'auto',
          },
          a: {
            color: '#488ecc',
            '&:hover': {
              color: lighten('#488ecc', 0.2),
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
            backgroundColor: '#488ecc',
            outline: '1px solid slategrey',
          },
          // '--ck-focus-ring': '1px solid #488ecc',
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
          backgroundColor: 'black',
          border: 'solid 1px !important',
          borderColor: 'rgba(255, 255, 255, 0.25) !important',
          minHeight: 'unset !important',
        },
        textContainer: {
          color: 'rgba(255, 255, 255, 0.3) !important',
        },
        icon: { color: 'rgba(255, 255, 255, 0.3) !important' },
      },

      MuiDropzonePreviewList: {
        root: {
          flexDirection: 'row',
          justifyContent: 'center',
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: '#000',
        },
      },
    },
  });
};

export default blueDarkTheme;
