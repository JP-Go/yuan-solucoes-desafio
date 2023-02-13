/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import {
  type ReactElement,
  useMemo,
  useState,
  useCallback,
  useEffect
} from 'react';
import { InfoOverlay } from './components/InfoOverlay';
import { SearchBar } from './components/SearchBar';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
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
    locations,
    appendLocation,
    removeLocation,
    hasSelectedLocations,
    moveTowardsEnd,
    moveTowardsStart,
    clearLocations
  } = useLocations();

  useEffect(() => {
    if (locations.length > 0 && map) {
      const bounds = new google.maps.LatLngBounds();
      locations.forEach((loc) => {
        bounds.extend({
          lat: loc.lat,
          lng: loc.lng
        });
      });
      map.fitBounds(bounds);
    }
  }, [map, locations]);
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
            hasSelectedLocations={hasSelectedLocations}
            locations={locations}
          />
          <SearchBar onSelected={appendLocation} />
          <InfoOverlay
            title={!hasSelectedLocations ? 'Últimas rotas' : 'Nova rota'}
            existingRoutes={routes}
            clearLocations={clearLocations}
            saveRoute={saveRoute}
            selectedLocations={locations}
            removeLocation={removeLocation}
            hasSelectedLocations={hasSelectedLocations}
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
