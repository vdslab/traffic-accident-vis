import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

function Map() {
    const japan = [35.6895, 139.6917];
    const japanBounds = [
        [24.396308, 122.934570], // 南端の座標
        [45.551483, 153.986672]  // 北端の座標
    ];
  return (
    <MapContainer 
      center={japan}
      zoom={5}
      scrollWheelZoom={true}
      maxBounds={japanBounds}
    >
      <TileLayer
        bounds={japanBounds}
        minZoom={5}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       <CircleMarker center={[51.51, -0.12]} radius={20}>
      <Popup>Popup in CircleMarker</Popup>
    </CircleMarker>
    </MapContainer>
  );
}

export default Map;