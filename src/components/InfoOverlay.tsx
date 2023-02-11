import { useState } from 'react';
import type { ReactElement } from 'react';
import { RouteInfo } from './RouteInfo';

export function InfoOverlay(): ReactElement {
  const [expanded, setExpanded] = useState(false);

  function toggleExpanded(): void {
    setExpanded((e) => !e);
    console.log(expanded);
  }
  return (
    <div
      className={`absolute bottom-0 bg-white text-slate-800
                 w-full md:w-3/5 md:py-4 rounded-lg flex flex-col align-center
                 drop-shadow-lg transition-all ${
                   expanded
                     ? 'h-2/3 overflow-y-scroll'
                     : 'h-1/3 overflow-y-hidden'
                 }`}
    >
      <div
        className="w-10 h-2 bg-slate-300 rounded-full mx-auto cursor-pointer absolute left-1/2 -translate-x-1/2"
        onClick={toggleExpanded}
      ></div>
      <h1 className="font-bold text-3xl w-full font-title ml-8 mb-4">
        Últimas rotas
      </h1>
      <div>
        <RouteInfo stops={2} />
        <RouteInfo stops={0} />
        <RouteInfo stops={3} />
        <RouteInfo stops={1} />
      </div>
    </div>
  );
}
