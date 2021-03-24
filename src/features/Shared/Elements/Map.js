import React, { useEffect } from 'react';
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

const JobMap = ({ position }) => {
  useEffect(() => {}, [position]);

  return (
    <MapContainer
      center={[position.lat || 0.0, position.lon || 0.0]}
      zoom={10}
      style={{ height: '300px', width: '100%' }}
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
              {position.name}, {position.country} <br />
            </Popup>
          </Marker>
          {/* <LocationMarker /> */}
        </>
      )}
    </MapContainer>
  );
};

export default JobMap;
