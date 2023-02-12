import { ArrowDown } from 'phosphor-react';
import { type ReactElement } from 'react';
import { type Location } from '../@types/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface NewRouteStopsProps {
  stops: Location[];
}

export function NewRouteStops({ stops }: NewRouteStopsProps): ReactElement {
  const [parent] = useAutoAnimate();
  const firstStop = stops[0];
  const lastStop = stops.length > 1 ? stops.at(-1) : undefined;
  const middleStops =
    stops.length > 2 ? stops.slice(1, stops.length - 1) : undefined;

  return (
    <div
      className="flex flex-col items-center text-slate-800 gap-4"
      ref={parent}
    >
      <p className="text-slate-800">
        <b className="font-bold">Partindo de:</b>
        {` ${firstStop.displayText.slice(0, 50)}${
          firstStop.displayText.length > 50 ? '...' : ''
        }`}
      </p>
      {middleStops?.map((location) => {
        return (
          <>
            <ArrowDown size={40} />
            <p key={location.id}>
              <b className="font-bold">Parada em:</b>
              {` ${location.displayText.slice(0, 50)}${
                location.displayText.length > 50 ? '...' : ''
              }`}
            </p>
          </>
        );
      })}
      {lastStop !== undefined && (
        <>
          <ArrowDown size={40} />
          <p>
            <b className="font-bold">Chegando a:</b>
            {` ${lastStop.displayText.slice(0, 50)}${
              lastStop.displayText.length > 50 ? '...' : ''
            }`}
          </p>
        </>
      )}
    </div>
  );
}
