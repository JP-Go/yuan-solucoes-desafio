import { ArrowDown, CaretDown, CaretUp, X } from 'phosphor-react';
import { type ReactElement } from 'react';
import { type Location } from '../@types/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { SaveRouteButton } from './SaveRouteButton';
import { useRoutesStore } from '../features/routes-slice';

interface RouteStopsProps {
  stops: Location[];
}

export function RouteStops({ stops }: RouteStopsProps): ReactElement {
  const [parent] = useAutoAnimate();
  const {
    moveTowardsEnd,
    moveTowardsStart,
    removeStop,
    clearStops,
    saveRoute,
    routeId,
    updateRoute
  } = useRoutesStore();

  function handleSaveRoute(stops: Location[]) {
    if (routeId) {
      console.log(routeId);
      updateRoute(stops, routeId);
    } else {
      saveRoute(stops);
    }
    clearStops();
  }

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
          <div
            className="flex flex-col items-center gap-2 w-full relative"
            key={location.id}
          >
            <div className="text-slate-800 grid grid-cols-6 w-3/4 place-items-center">
              <div className="col-start-1 col-span-5">
                <span className="font-bold">{predicateText}</span>
                <span>
                  {`${location.displayText.slice(0, 50)}${
                    location.displayText.length > 50 ? '...' : ''
                  }`}
                </span>
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
            {idx !== stops.length - 1 ? (
              <ArrowDown size={24} className="text-slate-500" weight="bold" />
            ) : null}
          </div>
        );
      })}
      {stops.length > 1 ? (
        <SaveRouteButton stops={stops} onSave={handleSaveRoute} />
      ) : null}
    </div>
  );
}
