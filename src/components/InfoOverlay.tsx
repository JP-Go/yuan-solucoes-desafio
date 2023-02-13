import { useState } from 'react';
import type { ReactElement } from 'react';
import { type Location } from '../@types/interfaces';
import { RoutesList } from './RoutesList';
import { NewRouteStops } from './NewRouteStops';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface InfoOverlayProps {
  title: string;
  selectedLocations: Location[];
  removeLocation: (locationId: string) => void;
  hasSelectedLocations: boolean;
}

export function InfoOverlay({
  title,
  selectedLocations,
  removeLocation,
  hasSelectedLocations
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
      <div
        className="w-10 h-2 bg-slate-300 rounded-full mx-auto cursor-pointer absolute left-1/2 -translate-x-1/2"
        onClick={toggleExpanded}
      ></div>
      <h1 className="font-bold text-3xl w-full font-title ml-8 mb-4">
        {title}
      </h1>
      <div ref={parent}>
        {hasSelectedLocations ? (
          <NewRouteStops
            stops={selectedLocations}
            removeLocation={removeLocation}
          />
        ) : (
          <RoutesList />
        )}
      </div>
    </div>
  );
}
