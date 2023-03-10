import { type ReactElement } from 'react';
import { Route } from '../@types/interfaces';
import { RouteInfo } from './RouteInfo';

interface RoutesListProps {
  routes: Route[];
}

export function RoutesList({ routes }: RoutesListProps): ReactElement {
  return (
    <>
      {routes.length > 0 ? (
        routes?.map((route) => {
          return <RouteInfo key={route.id} route={route} />;
        })
      ) : (
        <p className="font-bold text-2xl text-center w-full">
          Não há rotas salvas
        </p>
      )}
    </>
  );
}
