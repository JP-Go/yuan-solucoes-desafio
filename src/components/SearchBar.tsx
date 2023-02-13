import { MagnifyingGlass } from 'phosphor-react';
import { type ReactElement } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { type Location } from '../@types/interfaces';
import { fetchAddresses } from '../lib/api/geocoding';

interface SearchBarProps {
  onSelected: (location: Location) => void;
}

export function SearchBar({ onSelected }: SearchBarProps): ReactElement {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  async function handleSelectLocation(placeId: string): Promise<void> {
    const location = await fetchAddresses(placeId);
    onSelected({
      displayText: location.displayName,
      lat: location.lat,
      lng: location.lng,
      id: placeId
    });
    clearSuggestions();
    setValue('');
  }

  return (
    <div className="absolute top-2 h-16 w-3/5 z-10 flex flex-col items-center rounded-lg drop-shadow-lg">
      <div className="flex w-full">
        <MagnifyingGlass
          className="bg-white text-slate-500 rounded-r-lg h-12 pr-2 drop-shadow-r-lg"
          size={32}
          mirrored
        />
        <input
          className="bg-white placeholder:text-slate-500 p-2 w-full h-12 rounded-r-lg outline-none drop-shadow-t-lg drop-shadow-rb"
          placeholder="Busque um endereço para iniciar uma nova rota"
          value={value}
          disabled={!ready}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      {status === 'OK' ? (
        <ul className="bg-white flex flex-col z-10 w-full rounded-lg mt-2 p-2 gap-2">
          {data.map(({ place_id: placeId, description }) => {
            return (
              <li
                className="border-b-2 border-slate-300 max-w-full cursor-pointer"
                key={placeId}
                onClick={() => {
                  setValue(description, false);
                  void handleSelectLocation(placeId);
                }}
              >
                {description}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
