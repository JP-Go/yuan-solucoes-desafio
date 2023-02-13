import { useState } from 'react';
import { Location } from '../@types/interfaces';

export function useLocations() {
  const [stops, setStops] = useState<Location[]>([]);
  const hasSelectedStops = stops.length > 0;

  function clearStops() {
    setStops([]);
  }

  function moveTowardsEnd(location: Location) {
    const index = stops.findIndex((loc) => loc.id === location.id);
    if (index === -1) {
      throw new Error('Localização com id não presente');
    }
    if (index === stops.length - 1) {
      return;
    }
    const locationsCopy = [...stops];
    locationsCopy[index] = locationsCopy[index + 1];
    locationsCopy[index + 1] = location;
    setStops(locationsCopy);
  }
  function moveTowardsStart(location: Location) {
    const index = stops.findIndex((loc) => loc.id === location.id);
    if (index === -1) {
      throw new Error('Localização com id não presente');
    }
    if (index === 0) {
      return;
    }
    const locationsCopy = [...stops];
    locationsCopy[index] = locationsCopy[index - 1];
    locationsCopy[index - 1] = location;
    setStops(locationsCopy);
  }
  function appendStop(location: Location) {
    setStops((locs) => [...locs, location]);
  }

  function removeStop(locationId: string) {
    setStops((locs) => locs.filter((loc) => loc.id !== locationId));
  }

  return {
    stops,
    hasSelectedStops,
    appendStop,
    clearStops,
    removeStop,
    moveTowardsEnd,
    moveTowardsStart,
    setStops
  };
}
