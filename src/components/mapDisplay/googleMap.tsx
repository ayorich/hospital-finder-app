import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker'


interface Props {
  lat:number,
  lng:number,
  mapValue:any
}
const googleMap: React.FunctionComponent<Props> = (props) =>{
        const lat :number = props.lat;
        const lng : number  = props.lng;
        const zoom :number = 12;
        const mapDetails = props.mapValue;
        console.log(mapDetails);
const getMapOptions = (maps: any) => {
  return {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ],
  };
};

    return (
      <div style={{ height: "65vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_API_MAP_KEY as string,
          }}
          defaultCenter={{ lat: lat, lng: lng }}
          defaultZoom={zoom}
          options={getMapOptions}
        >
          {mapDetails
            ? mapDetails.map((point: any) => (
                <Marker
                  key={point.id}
                  lat={point.geometry.location.lat}
                  lng={point.geometry.location.lng}
                  name={point.name}
                  color="blue"
                />
              ))
            : null}
        </GoogleMapReact>
      </div>
    );
}

export default googleMap;