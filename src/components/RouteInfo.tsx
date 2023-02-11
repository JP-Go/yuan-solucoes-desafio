import type { ReactElement } from 'react';
import { MapPin } from 'phosphor-react';

export function RouteInfo(): ReactElement {
  return (
    <div className="flex space-evenly w-full border-t-2 border-slate-500 p-4">
      <div className="flex flex-col text-center items-center justify-center w-40 gap-4">
        <p className="font-medium text-2xl">Partida</p>
        <MapPin size={32} />
        <p>Rua Gov. Tibério Nunes, 1025</p>
      </div>
      <div></div>
    </div>
  );
}
