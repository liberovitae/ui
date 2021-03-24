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
import { routeConfig, backdrop } from '../../constants/globalVars';
import { handleReset, objCompare } from '../../helpers';
import LocationInput from './LocationInput';
import regionsList from '../../constants/regions';
import { Debounce, AutoComplete, Checkbox } from '../Shared/Inputs';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
  form: {
    maxWidth: '960px',
    margin: 'auto',
  },
  buttons: {
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
});

const Filter = React.memo(
  ({ handleClickAway }) => {
    const classes = useStyles();
    const searchVar = routeConfig().searchVar;
    const reactiveSearch = useReactiveVar(searchVar);
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    // const [nearMe, setNearMe] = useState(false);
    const [searchFilter, setSearchFilter] = useState({
      ...reactiveSearch,
    });

    const { INITIAL_STATE } = reactiveRouteConfig;

    useEffect(() => {
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

    const handleTypes = async (event) => {
      const { name, checked } = event.target;
      if (checked) {
        setSearchFilter((prevState) => ({
          ...prevState,
          types: [...prevState.types, name],
        }));
      } else {
        setSearchFilter((prevState) => ({
          ...prevState,
          types: prevState.types.filter((type) => type !== name),
        }));
      }
    };

    const handleSearch = async (event) => {
      const { name, value } = event.target;
      setSearchFilter((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      searchVar(searchFilter);
      handleClickAway();
    };

    if (reactiveSearch) {
      const { keywords, location, regions, types } = searchFilter;
      return (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div onClick={(e) => e.stopPropagation()}>
            <form
              className={classes.form}
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={1} justify="space-around">
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
                            <CloseIcon fontSize="small" />
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
                <Grid item className={classes.input} xs={12}>
                  <AutoComplete
                    id="regions"
                    name="regions"
                    // disabled={nearMe}
                    onChange={handleSearch}
                    data={regionsList()}
                    value={regions}
                    textFieldLabel={
                      <FormattedMessage id="filter.regions.input_label" />
                    }
                  />
                </Grid>

                <Checkbox
                  data={routeConfig().types()}
                  onChange={handleTypes}
                  state={types}
                />

                <Grid className={classes.buttons} item xs={12}>
                  <Collapse
                    in={!objCompare(searchFilter, INITIAL_STATE)}
                  >
                    <Link
                      to={{
                        pathname: '/alert/post',
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
                        if (objCompare(reactiveSearch, INITIAL_STATE))
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
    }
  },
  (prevProps, nextProps) => {},
);

export default Filter;
