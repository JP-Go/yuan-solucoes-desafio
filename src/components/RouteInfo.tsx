import type { ReactElement } from 'react';
import { MapPin, DotsThree } from 'phosphor-react';

interface RouteInfoProps {
  stops: number;
}

export function RouteInfo({ stops }: RouteInfoProps): ReactElement {
  return (
    <div className="flex space-around w-full border-t-2 border-slate-500 px-8 py-4">
      <div className="flex flex-col text-center items-center justify-center gap-4">
        <p className="font-medium text-2xl">Partida</p>
        <MapPin size={32} />
        <p>Rua Gov. Tibério Nunes, 1025</p>
      </div>
      <div className="flex w-full items-center justify-center space-between">
        {stops > 0 ? (
          <>
            <DotsThree size={100} />
            <span>+{stops} paradas</span>
            <DotsThree size={100} />
          </>
        ) : (
          <DotsThree size={100} />
        )}
      </div>
      <div className="flex flex-col text-center items-center justify-center gap-4">
        <p className="font-medium text-2xl">Chegada</p>
        <MapPin size={32} />
        <p>Rua Tibúrcio de Souza Pena, 1280</p>
      </div>
    </div>
  );
}
