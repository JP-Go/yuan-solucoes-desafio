import { ArrowDown, CaretDown, CaretUp, X } from 'phosphor-react';
import { Location } from '../@types/interfaces';
import { useRoutesStore } from '../features/routes-slice';

interface RouteStopInfoProps {
  location: Location;
  predicateText: string;
  firstLocation: boolean;
  lastLocation: boolean;
}

export function RouteStopInfo({
  location,
  predicateText,
  firstLocation,
  lastLocation
}: RouteStopInfoProps) {
  const { moveTowardsEnd, moveTowardsStart, removeStop } = useRoutesStore();
  return (
    <div
      className="flex flex-col items-center gap-2 w-full relative"
      key={location.id}
    >
      <div className="text-slate-800 grid grid-cols-6 grid-rows-none md:w-3/4 md:max-w-3/4 place-items-center">
        <div className="col-start-1 col-span-5 place-content-center">
          <p className="md:truncate">
            <strong className="font-bold">{predicateText}</strong>
            {location.displayText}
          </p>
        </div>
        <div className="flex gap-2 place-self-end">
          {!firstLocation && (
            <CaretUp
              weight="fill"
              size={24}
              className="text-slate-500 cursor-pointer"
              onClick={() => {
                moveTowardsStart(location);
              }}
            />
          )}
          {!lastLocation && (
            <CaretDown
              weight="fill"
              size={24}
              className="text-slate-500 cursor-pointer"
              onClick={() => {
                moveTowardsEnd(location);
              }}
            />
          )}
          <X
            className="text-red-500 cursor-pointer"
            size={24}
            onClick={() => removeStop(location.id)}
          />
        </div>
      </div>
      {!lastLocation ? (
        <ArrowDown size={24} className="text-slate-500" weight="bold" />
      ) : null}
    </div>
  );
}
