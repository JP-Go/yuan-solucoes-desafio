import { useState } from 'react';
import { Location } from '../@types/interfaces';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const hasSelectedLocations = locations.length > 0;

  function clearLocations() {
    setLocations([]);
  }
  function appendLocation(location: Location) {
    setLocations((locs) => [...locs, location]);
  }

  function removeLocation(locationId: string) {
    setLocations((locs) => locs.filter((loc) => loc.id !== locationId));
  }

  return {
    locations,
    hasSelectedLocations,
    appendLocation,
    clearLocations,
    removeLocation
  };
}
