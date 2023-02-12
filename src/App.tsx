/* eslint-disable @typescript-eslint/indent */
/* eslint-disable multiline-ternary */
import { type ReactElement, useMemo, useState } from 'react';
import { InfoOverlay } from './components/InfoOverlay';
import { SearchBar } from './components/SearchBar';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { type LatLng } from './@types/interfaces';

const libraries = ['places'];

function App(): ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GEOCODING_API_KEY,
    libraries
  });
  const center = useMemo(() => ({ lat: -5.1, lng: -42.9 }), []);

  const [selected, setSelected] = useState<LatLng[]>([]);
  const hasSelectedPlaces = selected?.length > 0;
  return (
    <div className="flex flex-col relative w-screen h-screen items-center">
      {isLoaded ? (
        <>
          <GoogleMap
            zoom={10}
            center={selected.length > 0 ? selected.at(-1) : center}
            mapContainerClassName="w-full h-full"
          >
            {hasSelectedPlaces
              ? selected.map((position) => {
                  return <Marker key={position.id} position={position} />;
                })
              : null}
          </GoogleMap>
          <SearchBar
            onSelected={(location) => {
              setSelected([...selected, location]);
            }}
          />
          <InfoOverlay
            title={!hasSelectedPlaces ? 'Últimas rotas' : 'Nova rota'}
            selectedPlaces={selected}
          />
        </>
      ) : (
        <div className="w-20 h-20 border-l-2 border-b-2 border-slate-800 rounded-full animate-spin"></div>
      )}
    </div>
  );
}

export default App;
