import { type ReactElement, useMemo } from 'react';
import { InfoOverlay } from './components/InfoOverlay';
import { SearchBar } from './components/SearchBar';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

function App(): ReactElement {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GEOCODING_API_KEY
  });
  const center = useMemo(() => ({ lat: 44, lng: -80 }), [])
  return (
    <div className="flex flex-col relative w-screen h-screen items-center">
      {isLoaded
        ? (
        <>
          <GoogleMap
            zoom={10}
            center={center}
            mapContainerClassName="w-full h-full"
          ></GoogleMap>
          <SearchBar />
          <InfoOverlay />
        </>
          )
        : (
        <div className="w-20 h-20 border-l-2 border-b-2 border-slate-800 rounded-full animate-spin"></div>
          )}
    </div>
  );
}

export default App;
