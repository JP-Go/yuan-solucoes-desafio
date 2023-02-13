import { ArrowDown, CaretDown, CaretUp, X } from 'phosphor-react';
import { type ReactElement } from 'react';
import { type Location } from '../@types/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface NewRouteStopsProps {
  stops: Location[];
  removeLocation: (locationId: string) => void;
  moveTowardsStart: (location: Location) => void;
  moveTowardsEnd: (location: Location) => void;
}

export function NewRouteStops({
  stops,
  removeLocation,
  moveTowardsStart,
  moveTowardsEnd
}: NewRouteStopsProps): ReactElement {
  const [parent] = useAutoAnimate();

  return (
    <div
      className="flex flex-col items-center text-slate-800 gap-4 p-8"
      ref={parent}
    >
      {stops.map((location, idx) => {
        const firstLocation = idx === 0;
        const lastLocation = idx === stops.length - 1;
        const predicateText = firstLocation
          ? 'Partindo de: '
          : lastLocation
          ? 'Chegando em: '
          : 'Parada em: ';
        return (
          <>
            <div
              key={location.id}
              className="text-slate-800 flex justify-around items-center w-full"
            >
              <div className="grow-1">
                <span className="font-bold">{predicateText}</span>
                <span>
                  {`${location.displayText.slice(0, 50)}${
                    location.displayText.length > 50 ? '...' : ''
                  }`}
                </span>
              </div>
              <div className="flex gap-2 self-end">
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
                  onClick={() => removeLocation(location.id)}
                />
              </div>
            </div>
            {idx !== stops.length - 1 ? (
              <ArrowDown size={24} className="text-slate-500" weight="bold" />
            ) : null}
          </>
        );
      })}
    </div>
  );
}
