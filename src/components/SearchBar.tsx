import { MagnifyingGlass, MapPin } from 'phosphor-react';
import { type ReactElement } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { useRoutesStore } from '../features/routes-slice';
import { fetchAddress } from '../lib/api/geocoding';

export function SearchBar(): ReactElement {
  const store = useRoutesStore();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  async function handleSelectLocation(placeId: string): Promise<void> {
    const location = await fetchAddress(placeId);
    store.appendStop(location);
    clearSuggestions();
    setValue('');
  }

  return (
    <div className="absolute top-2 md:mx-0 mx-4 h-30 md:w-3/5 w-4/5 z-10 flex flex-col items-center rounded-lg drop-shadow-lg">
      <div className="flex w-full">
        <MagnifyingGlass
          className="bg-white text-slate-500 rounded-r-lg h-12 pr-2 drop-shadow-r-lg"
          size={32}
          mirrored
        />
        <input
          className="bg-white placeholder:text-slate-500 p-2 w-full h-12 rounded-r-lg outline-none drop-shadow-t-lg drop-shadow-rb font-title"
          placeholder="Busque um endereço para iniciar uma nova rota"
          value={value}
          disabled={!ready}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      {status === 'OK' ? (
        <ul className="bg-white flex flex-col z-10 w-full h-40 rounded-lg mt-2 p-2 gap-2 font-title text-slate-500 overflow-y-scroll">
          {data.map(({ place_id: placeId, description }) => {
            return (
              <li
                className="border-b-2 border-slate-300 max-w-full cursor-pointer flex items-center gap-2 p-1"
                key={placeId}
                onClick={() => {
                  setValue(description, false);
                  void handleSelectLocation(placeId);
                }}
              >
                <MapPin weight="fill" />
                <span>{description}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
