import { MapContainer, TileLayer, Circle, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Data from '../assets/data.json'
import geojson from "../assets/prefectures.json"

function Dms2Deg(num) {
  return parseInt(num * 0.0000001) + parseInt(num * 0.00001) % 100 / 60 + num % 100000 * 0.001 / 60 / 60;
}

function Map() {
  const japan = [35.6895, 139.6917];
  // const [geojson, setGeojson] = useState(null);
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

  const gjClicked = (clickedPre) => {
    console.log('Clicked Prefecture:', clickedPre);

    if (clickedPre !== prefecture) {
      console.log("Setting Prefecture:", clickedPre);
      setPrefecture(clickedPre);
    } else {
      console.log("Clearing Prefecture");
      setPrefecture(null);
    }

    console.log('Current Prefecture:', prefecture);

  }

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: () => {
        // ホバー時に枠線を強調するスタイルに変更
        (!prefecture && layer.setStyle({
          weight: 5,
          color: 'green',
          opacity: 1,
        }));
        // layer.bringToFront(); // レイヤーを前面に移動
        // setHoveredFeature(feature);
      },
      mouseout: () => {
        (!prefecture && layer.setStyle(geoJSONStyle));
      },
      click:() => {
        const clickedPre = Object.values(feature.properties)[0];
        gjClicked(clickedPre);
        layer.bindPopup(prefecture);
      }

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
      {/* {hoveredFeature && (
        <GeoJSON data={hoveredFeature} style={{ color: 'blue', weight: 5, opacity: 1 }} />
      )} */}
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
