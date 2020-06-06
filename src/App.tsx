import React from 'react';
import axios from "axios";

import HeaderBar from './components/HeaderBar/HeaderBar';
import MapDisplay from './components/mapDisplay/mapDisplay';

import './App.css';

interface latlong {
  latitude: number;
  longitude:number;
}

const App: React.FC = (): JSX.Element => {
  const [locationValue, setLocationValue] = React.useState<latlong>();
  const [searchQuery, setsearchQuery] = React.useState('');
  const [radiusValue, setRadiusValue] = React.useState<number>(5);
  const [mapValue, setmapValue] = React.useState();
  


  React.useEffect(() => {
    let location;
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position)
      location = {
        latitude: position.coords.latitude,
        longitude : position.coords.longitude

      }
      setLocationValue(location);
    });
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(function(position){
        console.log(position)
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude

        }
        setLocationValue(location);
      })
    }
    
  }, []);

React.useEffect(() => {
  
  // to extract the latlong form a placeid
  let key = "AIzaSyBFvfsWl8OqrjOBovRkQ0s7Q_ijbxJx6dk";
  let lat: number;
  let long: number;
  let radius : any ;
  let keyword :any;
  if (locationValue) {
    radius = radiusValue * 1000;
    lat = locationValue.latitude;
    long = locationValue.longitude;
    
    keyword = searchQuery;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=restaurant&keyword=${keyword}&key=${key}`;
    axios.get(proxyurl + url).then((res) => {
      setmapValue(res.data.results);
    });
  }
}, [radiusValue, locationValue, searchQuery]);

  return (
    <div className="App">
      <HeaderBar
        radiusValue={radiusValue}
        setRadiusValue={setRadiusValue}
        setsearchQuery={setsearchQuery}
        searchQuery={searchQuery}
      />
      <MapDisplay
        mapValue={mapValue}
      />
    </div>
  );
}

export default App;
