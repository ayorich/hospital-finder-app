import React from 'react';
import axios from "axios";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import HeaderBar from "../components/HeaderBar/HeaderBar";
import TableDisplay from "../components/mapDisplay/TableDisplay";
import SideBar from "../components/SideBar/SideBar";
import GoogleMap from "../components/mapDisplay/googleMap";
import useDebounce from '../use-debounce';


import firebase from '../firebase';
import { v4 as uuidv4 } from 'uuid';




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
    longitude: number;
}




const Home: React.FC = (props): JSX.Element => {
    const classes = useStyles();
    const [locationValue, setLocationValue] = React.useState<latlong>();
    const [searchQuery, setsearchQuery] = React.useState('');
    const [radiusValue, setRadiusValue] = React.useState<number>(5);
    const [mapValue, setmapValue] = React.useState();
    const [spinner, setSpinner] = React.useState(false);
    const [userID, setUserID] = React.useState('');

    //DEBOUNCES SEARCHBAR INPUTS FOR 500ms TO AVOID SPAM QUERIES
    const debounceSearchTerm = useDebounce(searchQuery, 500);
    
    React.useEffect(() => { 
        setUserID(firebase.auth.currentUser!.uid)
    }, []);
   
    // GETS USER LOCATION AND WATCH FOR CHANGES
    React.useEffect(() => {
        let location;
        navigator.geolocation.getCurrentPosition(function (position) {
            location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude

            }
            setLocationValue(location);
        });

        // if (navigator.geolocation) {
        //     navigator.geolocation.watchPosition(function (position) {
        //         location = {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude

        //         }
        //         setLocationValue(location);
        //     })
        // }

    }, []);

    


    React.useEffect(() => {

        let key = process.env.REACT_APP_API_MAP_KEY;
        let lat: number;
        let long: number;
        let radius: any;
        let keyword: any;
        let data: any;
        

        // IF LOCATION AND DEBOUNCE SEARCH IS TRUE
        if (locationValue && debounceSearchTerm) {
            //SETS SPINNER TO TRUE
            setSpinner(true);
            radius = radiusValue * 1000;
            lat = locationValue.latitude;
            long = locationValue.longitude;
            keyword = debounceSearchTerm;
            
            // QUERIES URL AND SETSTATE
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=hospital&keyword=${keyword}&key=${key}`;
            axios
                .get(proxyurl + url)
                .then((res) => {
                    //SETS SPINNER FALSE AND SETSTATE VALUE FOR MAP AND TABLE DISPLAY
                    setSpinner(false);
                    setmapValue(res.data.results);
                    data = res.data.results;

                })
                .then(res => {
                    console.log(userID)
                    //IF DATA.LENGTH>0 EQUALS TRUE GENERATES DOCID, TIMESTAMP AND POST TO DATABASE
                    if (data.length > 0) {
                        let keyGen = uuidv4();
                        const date = Date.now()
                        firebase.db.collection('results').add({
                            keyword,
                            date,
                            userID,
                            data,
                            docID: keyGen,
                        })
                    }
                })
                .catch(error => {
                    //SETS SPINNER FALSE AND CATCH ,ALERT ERROR
                    setSpinner(false);
                    alert("NETWORK ERROR!!! PLEASE RETRY")
                });
        }
    }, [radiusValue, locationValue, debounceSearchTerm, userID]);

    return (
            <div data-test='component-home'>
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

export default Home;
