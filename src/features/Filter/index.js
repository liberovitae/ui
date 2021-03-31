import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useReactiveVar } from '@apollo/client';
// import useGeolocation from '@rooks/use-geolocation';
import {
  Grid,
  Collapse,
  Button,
  IconButton,
  InputAdornment,
  ClickAwayListener,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { GET_NEAREST_CITY } from './queries';
import {
  routeConfig,
  backdrop,
  quickSearch,
} from '../../constants/globalVars';
import { handleReset, objCompare } from '../../helpers';
import LocationInput from './LocationInput';
import SelectInput from './SelectInput';
import { Debounce, Checkbox, AutoComplete } from '../Shared/Inputs';
import {
  Close,
  DoubleArrowOutlined,
  Event,
  Today,
} from '@material-ui/icons';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateDayJSUtils from '@date-io/dayjs';
import { ALERT_POST } from '../../constants/routes';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: '960px',
    margin: 'auto',
  },
  buttons: {
    marginTop: '0.25rem',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 !important',
  },
  input: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  button: {
    margin: '0.5rem',
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: '0.25rem',
    },
  },
}));

const Filter = React.memo(
  ({ handleClickAway }) => {
    const classes = useStyles();
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const reactiveSearch = useReactiveVar(
      reactiveRouteConfig.searchVar,
    );
    const { searchVar } = reactiveRouteConfig;

    // const [nearMe, setNearMe] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
      ...reactiveSearch,
    });

    const { INITIAL_SEARCH_STATE, type } = reactiveRouteConfig;

    useEffect(() => {
      quickSearch({ show: false });
      backdrop(true);
    }, []);

    // const [getNearestCity] = useLazyQuery(GET_NEAREST_CITY, {
    //   onCompleted: ({ nearestCity }) => {
    //     if (nearestCity) {
    //       searchVar({
    //         ...searchVar(),
    //         location: `${nearestCity.name}, ${nearestCity.country}`,
    //       });
    //     }
    //   },
    // });

    // const getNearMe = () => {
    //   if (geoObj) {
    //     getNearestCity({
    //       variables: { lat: geoObj.lat, lon: geoObj.lng },
    //     });
    //   }
    // };

    // const when = nearMe;
    // const geoObj = useGeolocation({
    //   when,
    // });

    const handleSearch = async (e) => {
      const { name, value } = e.target;
      setSearchFilter((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleDates = async (e, type) => {
      setSearchFilter((prevState) => ({
        ...prevState,
        dates: {
          ...prevState.dates,
          [type]: e,
        },
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      searchVar(searchFilter);
      handleClickAway();
    };

    const { keywords, location, types, dates } = searchFilter;
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <div onClick={(e) => e.stopPropagation()}>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Grid
              container
              spacing={1}
              className={classes.container}
              justify="space-around"
              alignItems="center"
            >
              <Grid item className={classes.input} xs={6}>
                <Debounce
                  id="keywords"
                  name="keywords"
                  onChange={handleSearch}
                  value={keywords}
                  endAdornment={
                    keywords && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setSearchFilter((prevState) => ({
                              ...prevState,
                              keywords: '',
                            }))
                          }
                          size="small"
                          edge="end"
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                  label={<FormattedMessage id="common.keywords" />}
                />
              </Grid>
              <Grid item className={classes.input} xs={6}>
                <LocationInput
                  onChange={handleSearch}
                  location={location.name}
                />
              </Grid>

              <Grid item xs={12}>
                <AutoComplete
                  name="types"
                  value={types}
                  textFieldLabel={`${reactiveRouteConfig.type} types`}
                  data={routeConfig().types()}
                  onChange={handleSearch}
                />
                {/* <SelectInput
                    type={reactiveRouteConfig.type}
                    value={reactiveSearch.types}
                    name="types"
                    onChange={handleSearch}
                    label={`${reactiveRouteConfig.type} types`}
                    data={routeConfig().types()}
                  /> */}
              </Grid>

              {type === 'event' && (
                <MuiPickersUtilsProvider utils={DateDayJSUtils}>
                  <Grid style={{ textAlign: 'center' }} item xs={5}>
                    <DatePicker
                      animateYearScrolling
                      ampm={false}
                      autoOk
                      required
                      name="dateStart"
                      variant="inline"
                      disableToolbar
                      label="Start date"
                      InputProps={{
                        endAdornment: <Today />,
                      }}
                      value={dates?.start}
                      onChange={(e) => handleDates(e, 'start')}
                    />
                  </Grid>
                  <DoubleArrowOutlined
                    fontSize="small"
                    color="primary"
                    style={{
                      opacity: 0.7,
                      marginTop: '1rem',
                    }}
                  />
                  <Grid style={{ textAlign: 'center' }} item xs={5}>
                    <DatePicker
                      animateYearScrolling
                      ampm={false}
                      autoOk
                      required
                      name="dateEnd"
                      variant="inline"
                      disableToolbar
                      label="End date"
                      minDate={dates?.start || new Date()}
                      InputProps={{
                        endAdornment: <Event />,
                      }}
                      value={dates?.end}
                      onChange={(e) => handleDates(e, 'end')}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              )}
              <Grid className={classes.buttons} item xs={12}>
                <Collapse
                  in={!objCompare(searchFilter, INITIAL_SEARCH_STATE)}
                >
                  <Link
                    to={{
                      pathname: ALERT_POST,
                      query: searchFilter,
                    }}
                  >
                    <Button
                      className={classes.button}
                      onClick={handleClickAway}
                      size="small"
                      variant="outlined"
                      color="primary"
                    >
                      <FormattedMessage id="filter.create_job_alert_button" />
                    </Button>
                  </Link>
                  <Button
                    size="small"
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      if (
                        objCompare(
                          reactiveSearch,
                          INITIAL_SEARCH_STATE,
                        )
                      )
                        return handleClickAway();

                      handleReset();
                    }}
                  >
                    <FormattedMessage id="common.reset" />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className={classes.button}
                    size="small"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Search
                  </Button>
                </Collapse>
              </Grid>
            </Grid>
          </form>
        </div>
      </ClickAwayListener>
    );
  },
  (prevProps, nextProps) => {},
);

export default Filter;
