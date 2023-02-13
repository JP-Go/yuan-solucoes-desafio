/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import { type ReactElement, useMemo } from 'react';
import { InfoOverlay } from './components/InfoOverlay';
import { SearchBar } from './components/SearchBar';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useLocations } from './hooks/use-selected-locations';

const libraries = ['places'];

function App(): ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GEOCODING_API_KEY,
    libraries
  });
  const center = useMemo(() => ({ lat: -5.1, lng: -42.9 }), []);

  const {
    locations,
    appendLocation,
    removeLocation,
    hasSelectedLocations,
    moveTowardsEnd,
    moveTowardsStart
  } = useLocations();
  return (
    <div className="flex flex-col relative w-screen h-screen items-center">
      {isLoaded ? (
        <>
          <GoogleMap
            zoom={10}
            center={hasSelectedLocations ? locations.at(-1) : center}
            mapContainerClassName="w-full h-full"
          >
            {hasSelectedLocations
              ? locations.map((position) => {
                  return <Marker key={position.id} position={position} />;
                })
              : null}
          </GoogleMap>
          <SearchBar onSelected={appendLocation} />
          <InfoOverlay
            title={!hasSelectedLocations ? 'Últimas rotas' : 'Nova rota'}
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
