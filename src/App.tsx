/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import { type ReactElement, useState, useCallback, useEffect } from 'react';
import { InfoOverlay } from './components/InfoOverlay';
import { SearchBar } from './components/SearchBar';
import { useLoadScript } from '@react-google-maps/api';
import { useLocations } from './hooks/use-selected-locations';
import { useRoutes } from './hooks/use-routes';
import { Map } from './components/Map';

const libraries = ['places'];

function App(): ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GEOCODING_API_KEY,
    libraries
  });
  const [map, setMap] = useState<google.maps.Map>(null!);
  const onLoad = useCallback((map: google.maps.Map) => setMap(map), []);

  const { saveRoute, routes } = useRoutes();
  const {
    stops,
    appendStop,
    removeStop,
    hasSelectedStops,
    moveTowardsEnd,
    moveTowardsStart,
    clearStops,
    setStops
  } = useLocations();

  useEffect(() => {
    if (stops.length > 0 && map) {
      const bounds = new google.maps.LatLngBounds();
      stops.forEach((loc) => {
        bounds.extend({
          lat: loc.lat,
          lng: loc.lng
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, stops]);
  useEffect(() => {
    if (map) {
      map.setOptions({
        disableDefaultUI: true
      });
    }
  }, []);

  return (
    <div className="flex flex-col relative w-screen h-screen items-center">
      {isLoaded ? (
        <>
          <Map
            onLoad={onLoad}
            hasSelectedStops={hasSelectedStops}
            locations={stops}
          />
          <SearchBar onSelected={appendStop} />
          <InfoOverlay
            setStops={setStops}
            title={!hasSelectedStops ? 'Últimas rotas' : 'Nova rota'}
            existingRoutes={routes}
            clearStops={clearStops}
            saveRoute={saveRoute}
            selectedStops={stops}
            removeStop={removeStop}
            hasSelectedStops={hasSelectedStops}
            moveTowardsEnd={moveTowardsEnd}
            moveTowardsStart={moveTowardsStart}
          />
        </>
      ) : (
        <div className="w-20 h-20 border-l-2 border-b-2 border-slate-800 rounded-full animate-spin"></div>
      )}
    </div>
  );
}

export default App;
