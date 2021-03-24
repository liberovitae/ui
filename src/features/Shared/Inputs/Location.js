import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLazyQuery } from '@apollo/client';
import {
  FormLabel,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Collapse,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_LOCATION } from '../../Item/ItemForm/queries';
import { makeStyles } from '@material-ui/core/styles';
import { LocationOn, LocationOff } from '@material-ui/icons';
import useGeolocation from '@rooks/use-geolocation';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  map: {
    height: '300px',
  },
}));

// function LocationMarker() {
//   const [position, setPosition] = useState(null);
//   const map = useMapEvents({
//     // click() {
//     //   map.locate();
//     // },

//     locationfound(e) {
//       setPosition(e.latlng);
//       map.flyTo(e.latlng, map.getZoom());
//     },
//   });

//   return position === null ? null : (
//     <Marker position={position}>
//       <Popup>You are here</Popup>
//     </Marker>
//   );
// }

const compareValues = (key, order = 'asc') => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
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
};

const LocationInput = React.memo(
  ({ location, onChange, required, label, helperText }) => {
    const [options, setOptions] = useState([]);
    const [showMap, setShowMap] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const intl = useIntl();

    let [getLocation, { data, loading }] = useLazyQuery(
      GET_LOCATION,
      {
        onError: (err) => console.log(err),
      },
    );

    const when = showMap;
    const geoObj = useGeolocation({
      when,
    });

    const classes = useStyles();

    const JobMap = React.memo(
      ({ position }) => {
        return (
          <MapContainer
            center={[
              location.lat ||
                (position && position.lat) ||
                geoObj.lat ||
                0.0,
              location.lon ||
                (position && position.lon) ||
                geoObj.lng ||
                0.0,
            ]}
            zoom={10}
            className={classes.map}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png" />

            {/* <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}

            {position && (
              <>
                <Marker position={[position.lat, position.lon]}>
                  <Popup>
                    {position.name}, {position.country} <br /> Easily
                    customizable.
                  </Popup>
                </Marker>
                {/* <LocationMarker /> */}
              </>
            )}
          </MapContainer>
        );
      },
      (prevProps, nextProps) => {},
    );

    const onLocation = (location) => {
      data = null;
      setOptions([]);

      location.length >= 3 &&
        getLocation({ variables: { location: location } });
    };

    useEffect(() => {
      let active = true;

      if (active && data) {
        const { location } = data;

        setOptions(
          location
            .map((city) => city)
            .sort(compareValues('population', 'desc'))
            .map((city) => {
              if (city.country === 'US') {
                return {
                  label: `${city.name}, ${city.adminCode}, ${city.country}`,
                  value: city,
                };
              }

              return {
                label: `${city.name}, ${city.country}`,
                value: city,
              };
            }),
        );
      }

      return () => {
        active = false;
      };
    }, [loading, data]);

    return (
      <FormControl
        required={required}
        className={classes.formControl}
      >
        <FormLabel id="location">{label}</FormLabel>
        <Autocomplete
          id="location"
          name="location"
          autoHighlight
          autoSelect
          freeSolo
          required={required}
          value={location.name}
          getOptionSelected={(option, value) =>
            option.label === value.label
          }
          getOptionLabel={(option) => option.label || option}
          onChange={(e, value) => {
            if (value && value.value) {
              setSelectedLocation(value.value);
              return onChange({
                target: {
                  name: 'location',
                  value: {
                    name: value.label,
                    lat: value.value.lat,
                    lon: value.value.lon,
                  },
                },
              });
            }

            if (value) {
              return onChange({
                target: {
                  name: 'location',
                  value: {
                    name: value,
                    lat: null,
                    lon: null,
                  },
                },
              });
            }

            onChange({
              target: {
                name: 'location',
                value: {
                  name: '',
                  lat: '',
                  lon: '',
                },
              },
            });
          }}
          options={options}
          onInputChange={(e, value) => {
            onLocation(value);
          }}
          loading={loading}
          loadingText="Searching.."
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              required={required}
              helperText={helperText}
              placeholder={intl.formatMessage({
                id: 'post_job.location.input_placeholder',
              })}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading && params.inputProps.value.length > 3 ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowMap(!showMap)}
                          title="Enter on map"
                          size="small"
                          edge="end"
                        >
                          {showMap ? <LocationOff /> : <LocationOn />}
                        </IconButton>
                      </InputAdornment>
                    )}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <Collapse in={showMap}>
          {geoObj && <JobMap position={selectedLocation} />}
        </Collapse>
      </FormControl>
    );
  },
);

export default LocationInput;
