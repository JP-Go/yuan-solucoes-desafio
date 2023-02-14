import { create } from 'zustand';
import { Location, Route } from '../@types/interfaces';
import { devtools, createJSONStorage, persist } from 'zustand/middleware';

type Stops = Location[];
type Routes = Route[];

function saveRoute(routes: Routes, stops: Stops) {
  const route = {
    id: routes.length + 1,
    stops
  };
  return [...routes, route];
}

function updateRoute(routes: Routes, stops: Stops, id: number) {
  const route = routes.find((route) => route.id === id);
  if (!route) {
    throw new Error('Invalid state');
  }
  route.stops = stops;
  const newRoutes = routes.filter((r) => r.id !== route.id);
  return [...newRoutes, route];
}

function appendStop(stops: Stops, newStop: Location) {
  return [...stops, newStop];
}

function removeStop(stops: Stops, locationId: string) {
  return stops.filter((stop) => stop.id !== locationId);
}

function clearStops() {
  return [];
}

function moveTowardsStart(stops: Stops, location: Location) {
  const index = stops.findIndex((loc) => loc.id === location.id);
  if (index === -1) {
    throw new Error('Localização com id não presente');
  }
  if (index === 0) {
    return;
  }
  const stopsCopy = [...stops];
  stopsCopy[index - 1] = location;
  stopsCopy[index] = stops[index - 1];
  return stopsCopy;
}

function moveTowardsEnd(stops: Stops, location: Location) {
  const index = stops.findIndex((loc) => loc.id === location.id);
  if (index === -1) {
    throw new Error('Localização com id não presente');
  }
  if (index === stops.length - 1) {
    return;
  }

  const stopsCopy = [...stops];
  stopsCopy[index] = stops[index + 1];
  stopsCopy[index + 1] = location;
  return stopsCopy;
}

interface RoutesStore {
  routes: Routes;
  stops: Stops;
  routeId?: number;
  saveRoute: (stops: Stops) => void;
  updateRoute: (stops: Stops, id: number) => void;
  appendStop: (newStop: Location) => void;
  removeStop: (locationId: string) => void;
  clearStops: () => void;
  setStops: (stops: Stops) => void;
  moveTowardsStart: (location: Location) => void;
  moveTowardsEnd: (location: Location) => void;
  setRouteId: (routeId: number) => void;
}

export const useRoutesStore = create<RoutesStore>()(
  devtools(
    persist(
      (set) => ({
        routes: [],
        stops: [],
        routeId: undefined,
        appendStop(newStop) {
          set((state) => ({
            ...state,
            stops: appendStop(state.stops, newStop)
          }));
        },
        clearStops() {
          set((state) => ({
            ...state,
            stops: clearStops()
          }));
        },
        setStops(stops) {
          set((state) => ({ ...state, stops: stops }));
        },
        removeStop(locationId) {
          set((state) => ({
            ...state,
            stops: removeStop(state.stops, locationId)
          }));
        },
        moveTowardsEnd(location) {
          set((state) => ({
            ...state,
            stops: moveTowardsEnd(state.stops, location)
          }));
        },
        moveTowardsStart(location) {
          set((state) => ({
            ...state,
            stops: moveTowardsStart(state.stops, location)
          }));
        },
        setRouteId(routeId) {
          set((state) => {
            return {
              ...state,
              routeId: routeId
            };
          });
        },
        saveRoute(stops) {
          set((state) => ({
            ...state,
            routes: saveRoute(state.routes, stops)
          }));
        },
        updateRoute(stops, id) {
          set((state) => ({
            ...state,
            routes: updateRoute(state.routes, stops, id),
            routeId: undefined
          }));
        }
      }),
      {
        name: 'guarda-rotas',
        partialize: (state) => ({ routes: state.routes }),
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
);
