import { useState } from 'react';
import type { ReactElement } from 'react';
import { Route, type Location } from '../@types/interfaces';
import { RoutesList } from './RoutesList';
import { RouteStops } from './RouteStops';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface InfoOverlayProps {
  title: string;
  selectedStops: Location[];
  existingRoutes: Route[];
  hasSelectedStops: boolean;
  removeStop: (locationId: string) => void;
  moveTowardsEnd: (location: Location) => void;
  moveTowardsStart: (location: Location) => void;
  setStops: (locations: Location[]) => void;
  saveRoute: (stops: Location[]) => void;
  clearStops: () => void;
}

export function InfoOverlay({
  title,
  selectedStops,
  removeStop,
  hasSelectedStops,
  moveTowardsEnd,
  moveTowardsStart,
  existingRoutes,
  clearStops,
  setStops,
  saveRoute
}: InfoOverlayProps): ReactElement {
  const [expanded, setExpanded] = useState(false);
  const [parent] = useAutoAnimate();

  function toggleExpanded(): void {
    setExpanded((e) => !e);
  }
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
          onClick={clearStops}
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
          <RouteStops
            stops={selectedStops}
            clearStops={clearStops}
            removeStop={removeStop}
            moveTowardsEnd={moveTowardsEnd}
            moveTowardsStart={moveTowardsStart}
            saveRoute={saveRoute}
          />
        ) : (
          <RoutesList routes={existingRoutes} setStops={setStops} />
        )}
      </div>
    </div>
  );
}
