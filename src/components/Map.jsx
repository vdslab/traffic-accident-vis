import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import Data from '../assets/data.json';
import AnimationController from './AnimationController';

const dataByDate = {};
Data.forEach((value) => {
  const { ymd, ...other } = value;
  if (dataByDate[ymd] === undefined) {
    dataByDate[ymd] = [];
  }
  dataByDate[ymd].push(other);
});

function Dms2Deg(num) {
  return parseInt(num * 0.0000001) + parseInt(num * 0.00001) % 100 / 60 + num % 100000 * 0.001 / 60 / 60;
}

function Map() {
  const japan = [35.6895, 139.6917];
  const japanBounds = [
    [0.000000, 110.000000], // 南端の座標
    [51.000000, 167.000000]  // 北端の座標
  ];

  const [displayDate, setDisplayDate] = useState(new Date("2022-01-01").getTime());
  const minDisplayDate = new Date("2022-01-01").getTime();
  const maxDisplayDate = new Date("2022-12-31").getTime();

  const [animationPlayed, setAnimationPlayed] = useState(false);

  let circles;
  if (animationPlayed) {
    const displayDateObj = new Date(displayDate);
    const str = `${displayDateObj.getFullYear()}-${("0" + displayDateObj.getMonth()+1).slice(-2)}-${("0" + displayDateObj.getDate()).slice(-2)}`;
    if (dataByDate[str] === undefined) {
      circles = <></>;
    } else {
      circles = dataByDate[str].map((item, index) => {
        return (
          <Circle center={[Dms2Deg(item.q), Dms2Deg(item.r)]} radius={10} key={index} color={item.b === 1 ? '#1762b6' : '#00dceb'}>
            <Popup>{Dms2Deg(item.q)}, {Dms2Deg(item.r)}</Popup>
          </Circle>
        );
      });
    }
  } else {
    circles = Object.keys(dataByDate).map((key) => {
      return dataByDate[key].map((item, index) => {
        return (
          <Circle center={[Dms2Deg(item.q), Dms2Deg(item.r)]} radius={10} key={key+index} color={item.b === 1 ? '#1762b6' : '#00dceb'}>
            <Popup>{Dms2Deg(item.q)}, {Dms2Deg(item.r)}</Popup>
          </Circle>
        );
      });
    })
  }

  return (
    <div className="map-container">
      <div className="map-wrapper">
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
          {circles}
        </MapContainer>
      </div>
      <div className="controller-container">
        <AnimationController　displayDate={displayDate} setDisplayDate={setDisplayDate} animationPlayed={animationPlayed} setAnimationPlayed={setAnimationPlayed} minDisplayDate={minDisplayDate} maxDisplayDate={maxDisplayDate} />
      </div>
    </div>
  );
}

export default Map;
