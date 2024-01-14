import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import Data from '../assets/data.json'

function Dms2Deg(num) {
  return parseInt(num * 0.0000001) + parseInt(num * 0.00001) % 100 / 60 + num % 100000 * 0.001 / 60 / 60;
}

function Map() {
  const japan = [35.6895, 139.6917];
  const japanBounds = [
    [0.000000, 110.000000], // 南端の座標
    [51.000000, 167.000000]  // 北端の座標
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
      {
        Data.map((item, index) => {
          return (
            <Circle center={[Dms2Deg(item.q), Dms2Deg(item.r)]} radius={10} key={index}>
              <Popup>{Dms2Deg(item.q)}, {Dms2Deg(item.r)}</Popup>
            </Circle>
          );
        })
      }
    </MapContainer>
  );
}

export default Map;
