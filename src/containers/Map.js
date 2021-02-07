/* eslint-disable no-unused-vars */

import React from 'react';
import { DarkRedBnb, White } from '../theme/Colors';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const API_KEY = 'AIzaSyCMou7WJcAbrBcgzxpWWAS1Js3F5sLeWzg';

const containerStyle = {
  width: '450px',
  height: '435px',
};

const GoogleMapCard = ({ title, position }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const cardHeaderStyle = {
    background: DarkRedBnb,
    color: White,
    fontSize: '150%',
  };

  const cardStyle = {
    background: White,
    borderWidth: '2px',
    borderColor: DarkRedBnb,
  };

  const center = {
    lat: position?.latitude ?? 0,
    lng: position?.longitude ?? 0,
  };

  const defaultTitle = 'Hola';

  return isLoaded ? (
    <CCard style={cardStyle}>
      <CCardHeader style={cardHeaderStyle}>{title ? title : defaultTitle}</CCardHeader>
      <CCardBody>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={20} onLoad={onLoad} onUnmount={onUnmount}>
          <Marker key={'Hola'} position={center} />;
        </GoogleMap>
      </CCardBody>
    </CCard>
  ) : (
    <></>
  );
};

export default GoogleMapCard;
