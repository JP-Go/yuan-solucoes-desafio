import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMemo } from 'react';
import { Location } from '../@types/interfaces';

interface MapProps {
  onLoad: (map: google.maps.Map) => void;
  hasSelectedLocations: boolean;
  locations: Location[];
}

export function Map({ onLoad, locations, hasSelectedLocations }: MapProps) {
  const center = useMemo(() => {
    let location = { lat: -5.09, lng: -42.8 };
    return location;
  }, []);
  const zoom = 13;
  return (
    <GoogleMap
      onLoad={onLoad}
      zoom={zoom}
      center={hasSelectedLocations ? locations.at(-1) : center}
      mapContainerClassName="w-full h-full"
    >
      {hasSelectedLocations &&
        locations.map((location) => {
          return <Marker key={location.id} position={location} />;
        })}
    </GoogleMap>
  );
}