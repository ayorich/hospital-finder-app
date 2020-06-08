import React from 'react';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import HeaderBar from './components/HeaderBar/HeaderBar';
import MapDisplay from './components/mapDisplay/mapDisplay';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from './firebaseConfig';

import './App.css';

const useStyles = makeStyles({
  spinner: {
    marginTop: '30px',
  },
});

interface latlong {
  latitude: number;
  longitude:number;
}

const App: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const [locationValue, setLocationValue] = React.useState<latlong>();
  const [searchQuery, setsearchQuery] = React.useState('');
  const [radiusValue, setRadiusValue] = React.useState<number>(5);
  const [mapValue, setmapValue] = React.useState();
  const [spinner, setSpinner] = React.useState(false);
  


  React.useEffect(() => {
    let location;
    navigator.geolocation.getCurrentPosition(function(position){
      location = {
        latitude: position.coords.latitude,
        longitude : position.coords.longitude

      }
      setLocationValue(location);
    });
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(function(position){
        location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude

        }
        setLocationValue(location);
      })
    }
    
  }, []);

React.useEffect(() => {
  
  // let key = "AIzaSyBFvfsWl8OqrjOBovRkQ0s7Q_ijbxJx6dk";
  let key = process.env.REACT_APP_API_MAP_KEY;
  let lat: number;
  let long: number;
  let radius : any ;
  let keyword :any;
  if (locationValue && searchQuery) {
    setSpinner(true);
    radius = radiusValue * 1000;
    lat = locationValue.latitude;
    long = locationValue.longitude;
    
    keyword = searchQuery;
    
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=hospital&keyword=${keyword}&key=${key}`;
    axios
      .get(proxyurl + url)
      .then((res) => {
        setSpinner(false);
        setmapValue(res.data.results);
      })
      .then(res => console.log(firebase.db));
    //call a function to store recent data in firestore .then()
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
      {spinner ? <CircularProgress className={classes.spinner}/> : 
      <MapDisplay
        mapValue={mapValue}
      />}
      {/* CREATE A SIDEBAR TO DISPLAY PREVIOUS SEARCH RESULTS WITH A ONCLICK TO SHOW RESULTS ON MAP-DISPLAY */}
    </div>
  );
}

export default App;
