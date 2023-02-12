export interface Location {
  id: string;
  displayText: string;
  lat: number;
  lng: number;
}

export interface Route {
  stops: Location[];
}
