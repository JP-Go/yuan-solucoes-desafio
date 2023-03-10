import type { ReactElement } from 'react';
import { MapPin, DotsThree } from 'phosphor-react';
import { Route } from '../@types/interfaces';
import { useRoutesStore } from '../features/routes-slice';

interface RouteInfoProps {
  route: Route;
}

export function RouteInfo({ route }: RouteInfoProps): ReactElement {
  const start = route.stops[0];
  const end = route.stops.at(-1)!;
  const extraStops = route.stops.length - 2;
  const { setStops, setRouteId } = useRoutesStore();
  return (
    <div
      className="grid grid-cols-3 space-around w-full border-t-2 border-slate-500 px-8 py-4 cursor-pointer"
      onClick={() => {
        setRouteId(route.id);
        setStops(route.stops);
      }}
    >
      <div className="flex flex-col text-center items-center justify-center gap-4 px-8">
        <p className="font-medium text-2xl">Partida</p>
        <MapPin size={32} />
        <p className="text-slate-500">{start.displayText}</p>
      </div>
      <div className="flex w-full items-center justify-center space-between text-slate-500">
        {extraStops > 0 ? (
          <>
            <DotsThree size={80} />
            <span>+{extraStops} paradas</span>
            <DotsThree size={80} />
          </>
        ) : (
          <DotsThree size={80} />
        )}
      </div>
      <div className="flex flex-col text-center items-center justify-center gap-4">
        <p className="font-medium text-2xl">Chegada</p>
        <MapPin size={32} />
        <p className="text-slate-500">{end.displayText}</p>
      </div>
    </div>
  );
}
