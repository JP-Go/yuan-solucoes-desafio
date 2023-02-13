import { useEffect, useState } from 'react';
import { Location, Route } from '../@types/interfaces';

export function useRoutes() {
  const storedRoutes = localStorage.getItem('x-app-routes');
  const parsedRoutes = storedRoutes !== null ? JSON.parse(storedRoutes) : [];
  const [routes, setRoutes] = useState<Route[]>(parsedRoutes);

  useEffect(() => {
    const serializedRoutesInfo = JSON.stringify(routes);
    localStorage.setItem('x-app-routes', serializedRoutesInfo);
  }, [routes]);

  function saveRoute(stops: Location[]) {
    const route: Route = {
      id: routes.length,
      stops
    };
    setRoutes((routes) => [...routes, route]);
  }

  return {
    saveRoute,
    routes
  };
}
