import { useState } from 'react';
import { Location } from '../@types/interfaces';

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const hasSelectedLocations = locations.length > 0;

  function clearLocations() {
    setLocations([]);
  }

  function moveTowardsEnd(location: Location) {
    const index = locations.findIndex((loc) => loc.id === location.id);
    if (index === -1) {
      throw new Error('Localização com id não presente');
    }
    if (index === locations.length - 1) {
      return;
    }
    const locationsCopy = [...locations];
    locationsCopy[index] = locationsCopy[index + 1];
    locationsCopy[index + 1] = location;
    setLocations(locationsCopy);
  }
  function moveTowardsStart(location: Location) {
    const index = locations.findIndex((loc) => loc.id === location.id);
    if (index === -1) {
      throw new Error('Localização com id não presente');
    }
    if (index === 0) {
      return;
    }
    const locationsCopy = [...locations];
    locationsCopy[index] = locationsCopy[index - 1];
    locationsCopy[index - 1] = location;
    setLocations(locationsCopy);
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
    removeLocation,
    moveTowardsEnd,
    moveTowardsStart
  };
}
