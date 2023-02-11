import type { LatLngTuple } from 'leaflet';
import type { ReactElement } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { InfoOverlay } from './components/InfoOverlay';
import { SearchBar } from './components/SearchBar';

const coords = [-5.03, -42.9] as LatLngTuple;

function App(): ReactElement {
  return (
    <div className="flex flex-col relative w-screen h-screen items-center">
      <MapContainer
        className="w-full h-screen fixed inset-0"
        center={coords}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <SearchBar />
      <InfoOverlay />
    </div>
  );
}

export default App;
