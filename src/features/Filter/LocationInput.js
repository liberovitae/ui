import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLazyQuery } from '@apollo/client';
import { TextField, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_LOCATION } from '../Job/JobForm/queries';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
}));

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA =
      typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB =
      typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

export default function Asynchronous({ location, onChange }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searching, setSearching] = useState(false);
  const classes = useStyles();

  let [getLocation, { data, loading }] = useLazyQuery(GET_LOCATION, {
    onError: (err) => console.log(err),
  });

  const onLocation = (location) => {
    data = null;
    setOptions([]);

    if (location.startsWith(',')) return;

    location.length >= 3 &&
      getLocation({ variables: { location: location } });
  };

  useEffect(() => {
    let active = true;

    if (active && data && searching) {
      const { location } = data;

      setOptions(
        location
          .map((city) => city)
          .sort(compareValues('population', 'desc'))
          .map((city) => {
            if (city.country === 'US') {
              return `${city.name}, ${city.adminCode}, ${city.country}`;
            }

            return `${city.name}, ${city.country}`;
          }),
      );
    }

    return () => {
      active = false;
    };
  }, [loading, data]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
      data = null;
      setSearching(false);
    }
  }, [open, data]);

  return (
    <FormControl className={classes.formControl}>
      <Autocomplete
        id="location"
        name="location"
        autoHighlight
        autoSelect
        freeSolo
        value={location}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        getOptionSelected={(option, value) => option === value}
        getOptionLabel={(option) => option}
        onChange={(e, value) => {
          onChange({
            target: {
              name: 'location',
              value: { name: value },
            },
          });
        }}
        options={options}
        onInputChange={(e, value) => {
          onChange({
            target: {
              name: 'location',
              value: { name: value },
            },
          });
          setSearching(true);
          value.length === 0 && setOpen(false);
          onLocation(value);
        }}
        loading={loading}
        loadingText="Searching.."
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={<FormattedMessage id="common.location" />}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading && params.inputProps.value.length > 3 ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </FormControl>
  );
}
