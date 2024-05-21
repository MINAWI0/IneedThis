// src/MapComponent.js
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue with React-Leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  return null;
};

const MapComponent = ({ latitude, longitude, latitude2, longitude2 }) => {
  const position = [latitude, longitude];
  const position2 = [latitude2, longitude2];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '200px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Your current location</Popup>
      </Marker>
      <Marker position={position2}>
        <Popup>Second location</Popup>
      </Marker>
      <Polyline positions={[position, position2]} color="blue" />
      <RecenterAutomatically lat={latitude} lng={longitude} />
    </MapContainer>
  );
};

export default MapComponent;
