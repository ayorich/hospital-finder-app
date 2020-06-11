import React from 'react';
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import HeaderBar from "./components/HeaderBar/HeaderBar";
import TableDisplay from "./components/mapDisplay/TableDisplay";
import SideBar from "./components/SideBar/SideBar";
import GoogleMap from "./components/mapDisplay/googleMap";
import useDebounce from './use-debounce';


import firebase from './firebaseConfig';


import './App.css';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
    },
    spinner: {
      marginTop: '30px',
    },
  }),
);
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
  
  const debounceSearchTerm =  useDebounce(searchQuery, 500);


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
    let key = process.env.REACT_APP_API_MAP_KEY;
    let lat: number;
    let long: number;
    let radius : any ;
    let keyword :any;
    let data :any;
    if (locationValue && debounceSearchTerm) {
      setSpinner(true);

      radius = radiusValue * 1000;
      lat = locationValue.latitude;
      long = locationValue.longitude;
      keyword = debounceSearchTerm;

      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=hospital&keyword=${keyword}&key=${key}`;
      axios
        .get(proxyurl + url)
        .then((res) => {
          setSpinner(false);
          setmapValue(res.data.results);
          data=res.data.results;

        })
        .then(res =>{
          if(data.length > 0){
            const date = Date.now()
            firebase.db.collection('results').add({
              keyword,
              date,
              data
            })
          }
            })
      .catch(error => {
        setSpinner(false);
        alert("NETWORK ERROR!!! PLEASE RETRY")
      });
    }
  }, [radiusValue, locationValue, debounceSearchTerm]);

  return (
    <div className="App">
      <HeaderBar
        radiusValue={radiusValue}
        setRadiusValue={setRadiusValue}
        setsearchQuery={setsearchQuery}
      />
      <Grid container spacing={2}>
        <Grid item xs={9}>
          {locationValue ? (
            <GoogleMap
              lat={locationValue.latitude}
              lng={locationValue.longitude}
              mapValue={mapValue}
            />
          ) : null}
        </Grid>
        <Grid item xs={3}>
          <SideBar setmapValue={setmapValue} setSpinner={setSpinner} />
        </Grid>
        <Grid item xs={9}>
          {spinner ? (
            <CircularProgress className={classes.spinner} />
          ) : (
            <TableDisplay mapValue={mapValue} />
          )}
        </Grid>
      </Grid>
      
    </div>
  );
}

export default App;
