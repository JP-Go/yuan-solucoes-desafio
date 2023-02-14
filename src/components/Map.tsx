import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import { Location } from '../@types/interfaces';

type Map = google.maps.Map;
type DirectionsResult = google.maps.DirectionsResult;
interface MapProps {
  onLoad: (map: Map) => void;
  hasSelectedStops: boolean;
  locations: Location[];
}

export function Map({ onLoad, locations, hasSelectedStops }: MapProps) {
  const center = useMemo(() => {
    let location = { lat: -5.09, lng: -42.8 };
    return location;
  }, []);
  const zoom = 13;
  const [directions, setDirections] = useState<DirectionsResult | undefined>(
    undefined
  );
  const shouldFetch = locations.length > 1;
  const service = new google.maps.DirectionsService();

  useEffect(() => {
    if (shouldFetch) {
      setTimeout(() => {
        fetchDirections(locations);
      }, 1500);
    } else {
      setDirections(undefined);
    }
  }, [shouldFetch, locations]);

  async function fetchDirections(locations: Location[]) {
    if (locations.length < 2) {
      return;
    }
    const firstLocation = locations[0];
    const lastlocation = locations.at(-1)!;
    const waypoints =
      locations.length > 2
        ? locations.slice(1, -1).map((location) => ({
            location: location
          }))
        : undefined;
    service.route(
      {
        origin: firstLocation,
        destination: lastlocation,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints
      },
      (results, status) => {
        if (status === 'OK' && results) {
          setDirections(results);
        }
      }
    );
  }

  return (
    <GoogleMap
      onLoad={onLoad}
      zoom={zoom}
      center={hasSelectedStops ? locations.at(-1) : center}
      mapContainerClassName="w-full h-full"
    >
      {directions ? <DirectionsRenderer directions={directions} /> : null}
      {hasSelectedStops &&
        locations.map((location) => {
          return <Marker key={location.id} position={location} />;
        })}
    </GoogleMap>
  );
}
