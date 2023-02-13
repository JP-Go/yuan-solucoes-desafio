import { ArrowDown, X } from 'phosphor-react';
import { type ReactElement } from 'react';
import { type Location } from '../@types/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface NewRouteStopsProps {
  stops: Location[];
  removeLocation: (locationId: string) => void;
}

export function NewRouteStops({
  stops,
  removeLocation
}: NewRouteStopsProps): ReactElement {
  const [parent] = useAutoAnimate();
  const firstStop = stops[0];
  const lastStop = stops.length > 1 ? stops.at(-1) : undefined;
  const middleStops =
    stops.length > 2 ? stops.slice(1, stops.length - 1) : undefined;

  return (
    <div
      className="flex flex-col items-center text-slate-800 gap-4 p-8"
      ref={parent}
    >
      <div className="text-slate-800 flex justify-center items-center w-full">
        <div className="grow-1">
          <span className="font-bold">Partindo de: </span>
          <span>
            {`${firstStop.displayText.slice(0, 50)}${
              firstStop.displayText.length > 50 ? '...' : ''
            }`}
          </span>
        </div>
        <X
          className="text-red-500 ml-8 justify-self-end grow-1 cursor-pointer"
          size={24}
          onClick={() => removeLocation(firstStop.id)}
        />
      </div>
      {middleStops?.map((location) => {
        return (
          <>
            <ArrowDown size={40} />
            <p
              key={location.id}
              className="text-slate-800 flex items-center justify-center w-full"
            >
              <b className="font-bold">Parada em:</b>
              {` ${location.displayText.slice(0, 50)}${
                location.displayText.length > 50 ? '...' : ''
              }`}
              <X
                className="text-red-500 justify-self-end ml-8 cursor-pointer"
                size={24}
                onClick={() => removeLocation(location.id)}
              />
            </p>
          </>
        );
      })}
      {lastStop !== undefined && (
        <>
          <ArrowDown size={40} />
          <div className="text-slate-800 flex justify-center items-center w-full">
            <div className="grow-1">
              <span className="font-bold">Chegando a: </span>
              <span>
                {`${lastStop.displayText.slice(0, 50)}${
                  lastStop.displayText.length > 50 ? '...' : ''
                }`}
              </span>
            </div>
            <X
              className="text-red-500 justify-self-end ml-8 cursor-pointer"
              size={24}
              onClick={() => removeLocation(lastStop.id)}
            />
          </div>
        </>
      )}
    </div>
  );
}
