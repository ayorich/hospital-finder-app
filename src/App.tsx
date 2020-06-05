import React from 'react';
import axios from "axios";

import HeaderBar from './components/HeaderBar/HeaderBar';
import MapDisplay from './components/mapDisplay/mapDisplay';

import './App.css';

interface latlong {
  lat: number;
  lng:number;
}

const App: React.FC = (): JSX.Element => {
const [locationValue, setLocationValue] = React.useState<latlong>();
  const [radiusValue, setRadiusValue] = React.useState<number>(5);
  const [mapValue, setmapValue] = React.useState();
React.useEffect(() => {
  // to extract the latlong form a placeid
  let key = "AIzaSyBFvfsWl8OqrjOBovRkQ0s7Q_ijbxJx6dk";
  let lat: any;
  let long: any;
  let radius : any ;
  if (locationValue && radiusValue) {
    radius = radiusValue * 1000;
    lat = locationValue.lat;
    long = locationValue.lng;
    console.log(lat);
    console.log(long);
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=restaurant&key=${key}`;
    axios.get(proxyurl + url).then((res) => {
      console.log(res.data.results);
      setmapValue(res.data.results);
    });
  }
}, [radiusValue, locationValue]);

  return (
    
    <div className="App">
      <HeaderBar
        locationValue={locationValue}
        setLocationValue={setLocationValue}
        radiusValue={radiusValue}
        setRadiusValue={setRadiusValue}
      />
      <MapDisplay
        mapValue={mapValue}
      />
    </div>
  );
}

export default App;
