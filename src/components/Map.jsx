import { MapContainer, TileLayer, Circle, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Data from '../assets/data.json'
import geojson from "../assets/prefectures.json"
import prejson from "../assets/pre.json";
function Dms2Deg(num) {
  return parseInt(num * 0.0000001) + parseInt(num * 0.00001) % 100 / 60 + num % 100000 * 0.001 / 60 / 60;
}

function Map() {
  const japan = [35.6895, 139.6917];
  const japanBounds = [
    [0.000000, 110.000000], // 南端の座標
    [51.000000, 167.000000]  // 北端の座標
  ];
  const [prefecture, setPrefecture] = useState(null);
  const geoJSONStyle = {
    color: "white",
    weight: 0.5,
    opacity: 0,
  };

  const hoverStyle = {
    weight: 5,
    color: 'green',
    opacity: 1,
  };

  function serchKey(obj, target) {
    const key = Object.keys(obj).find((key) => obj[key] === target);
    return key;
  }

  console.log('Current Prefecture:', prefecture);
  const onEachFeature = (feature, layer) => {
    const clickedPre = Object.values(feature.properties)[0];
    layer.on({
      mouseover: () => {
        console.log(prefecture);
        (!prefecture && layer.setStyle(hoverStyle));
      },
      mouseout: () => {
        (!prefecture && layer.setStyle(geoJSONStyle));
      },
      click:() => {
        setPrefecture(clickedPre);
      }
    });
    layer.bindPopup(clickedPre);
    layer.on('popupclose', () => {
      setPrefecture(null);
    });
  }

  return (
    <MapContainer
      center={japan}
      zoom={5}
      scrollWheelZoom={true}
      maxBounds={japanBounds}
    >
      {geojson && <GeoJSON data={geojson} style={geoJSONStyle} onEachFeature={onEachFeature} />}
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
