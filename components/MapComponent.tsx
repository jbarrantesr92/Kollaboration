import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useRef, MutableRefObject } from 'react';

interface Location {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  location?: Location;
}

const containerStyle = {
  width: '400px',
  height: '350px'
};

const MapComponent: React.FC<MapComponentProps> = ({ location = { lat: 40.712776, lng: -74.005974 } }) => {
  const mapRef = useRef<google.maps.Map | null>(null);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={16}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
