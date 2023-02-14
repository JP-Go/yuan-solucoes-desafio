import { type ReactElement } from 'react';
import { type Location } from '../@types/interfaces';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { SaveRouteButton } from './SaveRouteButton';
import { useRoutesStore } from '../features/routes-slice';
import { RouteStopInfo } from './RouteStopInfo';

interface RouteStopsProps {
  stops: Location[];
}

export function RouteStops({ stops }: RouteStopsProps): ReactElement {
  const [parent] = useAutoAnimate();
  const { clearStops, saveRoute, routeId, updateRoute } = useRoutesStore();

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
          <RouteStopInfo
            key={location.id}
            location={location}
            predicateText={predicateText}
            firstLocation={firstLocation}
            lastLocation={lastLocation}
          />
        );
      })}
      {stops.length > 1 ? (
        <SaveRouteButton stops={stops} onSave={handleSaveRoute} />
      ) : null}
    </div>
  );
}
