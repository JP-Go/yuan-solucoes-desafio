import type { ReactElement } from 'react';

export function InfoOverlay(): ReactElement {
  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white text-slate-800
                 w-full md:w-3/5 h-1/3 px-16 md:px-8 md:py-4 rounded-lg flex flex-col align-center
                 drop-shadow-lg"
    >
      <div className="w-10 h-2 bg-slate-300 rounded-full mx-auto"></div>
      <h1 className="font-bold text-3xl w-full font-title">Últimas rotas</h1>
    </div>
  );
}
