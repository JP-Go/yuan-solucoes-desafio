export interface LatLng {
  id: string;
  displayText: string;
  lat: number;
  lng: number;
}

export interface Route {
  stops: LatLng[];
}
