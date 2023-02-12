import { type ReactElement } from 'react';
import { RouteInfo } from './RouteInfo';

export function RoutesList(): ReactElement {
  return (
    <>
      <RouteInfo stops={2} />
      <RouteInfo stops={0} />
      <RouteInfo stops={3} />
      <RouteInfo stops={1} />
    </>
  );
}
