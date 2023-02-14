import { useState } from 'react';
import type { ReactElement } from 'react';
import { Route } from '../@types/interfaces';
import { RoutesList } from './RoutesList';
import { RouteStops } from './RouteStops';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useRoutesStore } from '../features/routes-slice';

interface InfoOverlayProps {
  existingRoutes: Route[];
}

export function InfoOverlay({
  existingRoutes
}: InfoOverlayProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const [parent] = useAutoAnimate();
  const { stops, clearStops, routeId, setRouteId } = useRoutesStore();
  const hasSelectedStops = stops.length > 0;

  function toggleExpanded(): void {
    setExpanded((e) => !e);
  }
  const title = !hasSelectedStops
    ? 'Últimas rotas'
    : routeId === undefined
    ? 'Nova rota'
    : 'Editar rota';
  return (
    <div
      className={`absolute bottom-0 bg-white text-slate-800
                 w-full md:w-3/5 md:py-4 rounded-lg flex flex-col align-center
                 drop-shadow-lg transition-all ${
                   expanded
                     ? 'h-2/3 max-h-full overflow-y-scroll'
                     : 'h-1/3 max-h-1/2 overflow-y-hidden'
                 }`}
    >
      {hasSelectedStops ? (
        <button
          className="text-white bg-slate-700 font-bold rounded-lg p-2 drop-shadow-lg w-fit absolute top-4 right-4"
          onClick={() => {
            clearStops();
            setRouteId(undefined);
          }}
        >
          Cancelar
        </button>
      ) : null}
      <div
        className="w-10 h-2 bg-slate-300 rounded-full mx-auto cursor-pointer absolute left-1/2 -translate-x-1/2"
        onClick={toggleExpanded}
      />
      <h1 className="font-bold text-3xl w-full font-title ml-8 mb-4">
        {title}
      </h1>
      <div ref={parent}>
        {hasSelectedStops ? (
          <RouteStops stops={stops} />
        ) : (
          <RoutesList routes={existingRoutes} />
        )}
      </div>
    </div>
  );
}
