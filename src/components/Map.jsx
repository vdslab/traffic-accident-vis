import { MapContainer, TileLayer, Circle, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useContext } from "react";
import Data from "../assets/data.json";
import AnimationController from "./AnimationController";
import geojson from "../assets/prefectures.json"
import prejson from "../assets/pre.json";
import SubChart from './SubChart';

import { DataContext } from "../App.jsx";

function Dms2Deg(num) {
  return (
    parseInt(num * 0.0000001) +
    (parseInt(num * 0.00001) % 100) / 60 +
    ((num % 100000) * 0.001) / 60 / 60
  );
}

function Map() {
  const japan = [35.6895, 139.6917];
  const japanBounds = [
    [0.0, 110.0], // 南端の座標
    [51.0, 167.0], // 北端の座標
  ];

  const [data, setData] = useContext(DataContext);
  const [dataByDate, setDataByDate] = useState({});

  useEffect(() => {
    const newDataByDate = {};
    data.forEach((value) => {
      const { ymd, ...other } = value;
      if (newDataByDate[ymd] === undefined) {
        newDataByDate[ymd] = [];
      }
      newDataByDate[ymd].push(other);
    });
    setDataByDate(newDataByDate);
  }, [data]);

  const [displayDate, setDisplayDate] = useState(
    new Date("2022-01-01").getTime(),
  );
  const minDisplayDate = new Date("2022-01-01").getTime();
  const maxDisplayDate = new Date("2022-12-31").getTime();

  const [animationPlayed, setAnimationPlayed] = useState(false);

  let circles;
  if (animationPlayed) {
    const displayDateObj = new Date(displayDate);
    const str = `${displayDateObj.getFullYear()}-${(
      "0" +
      (displayDateObj.getMonth() + 1)
    ).slice(-2)}-${("0" + displayDateObj.getDate()).slice(-2)}`;
    if (dataByDate[str] === undefined) {
      circles = <></>;
    } else {
      circles = dataByDate[str].map((item, index) => (
        <Circle
          center={[Dms2Deg(item.q), Dms2Deg(item.r)]}
          radius={10}
          key={index}
          color={item.b === 1 ? "#1762b6" : "#00dceb"}
        >
          <Popup>
            {Dms2Deg(item.q)}, {Dms2Deg(item.r)}
          </Popup>
        </Circle>
      ));
    }
  } else {
    circles = Object.keys(dataByDate).map((key) =>
      dataByDate[key].map((item, index) => (
        <Circle
          center={[Dms2Deg(item.q), Dms2Deg(item.r)]}
          radius={10}
          key={key + index}
          color={item.b === 1 ? "#1762b6" : "#00dceb"}
        >
          <Popup>
            {Dms2Deg(item.q)}, {Dms2Deg(item.r)}
          </Popup>
        </Circle>
      )),
    );
  }

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
  console.log(prefecture);
  function serchKey(obj, target) {
    const key = Object.keys(obj).find((key) => obj[key] === target);
    return key;
  }
  const onEachFeature = (feature, layer) => {
    const clickedPre = Object.values(feature.properties)[0];
    layer.on({
      mouseover: () => {
        layer.setStyle(hoverStyle);
      },
      mouseout: () => {
        layer.setStyle(geoJSONStyle);
      },
      click: () => {
        setPrefecture(serchKey(prejson, clickedPre));
      }
    });
    layer.bindPopup(clickedPre);
    layer.on('popupclose', () => {
      setPrefecture(null);
    });
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
          <GeoJSON
            data={geojson}
            style={geoJSONStyle}
            onEachFeature={onEachFeature}
          />
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
        <AnimationController
          displayDate={displayDate}
          setDisplayDate={setDisplayDate}
          animationPlayed={animationPlayed}
          setAnimationPlayed={setAnimationPlayed}
          minDisplayDate={minDisplayDate}
          maxDisplayDate={maxDisplayDate}
        />
      </div>
      <SubChart prefCode={String(prefecture)} />
    </div>
  );
}

export default Map;
