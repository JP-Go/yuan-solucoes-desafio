import { type ReactElement } from 'react';
import { Location, Route } from '../@types/interfaces';
import { RouteInfo } from './RouteInfo';

interface RoutesListProps {
  routes: Route[];
  setStops: (locations: Location[]) => void;
}

export function RoutesList({
  routes,
  setStops
}: RoutesListProps): ReactElement {
  return (
    <>
      {routes.length > 0 ? (
        routes?.map((route) => {
          return <RouteInfo key={route.id} route={route} setStops={setStops} />;
        })
      ) : (
        <p className="font-bold text-2xl text-center w-full">
          Não há rotas salvas
        </p>
      )}
    </>
  );
}
