import axios from 'axios';
const geocodingProvider = axios.create({
  baseURL: import.meta.env.VITE_GEOCODING_API_BASE_URL
});

interface LocationApiResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    place_id: string;
    formatted_address: string;
  }>;
  status: string;
}

export interface Location {
  placeId: string;
  lat: number;
  lng: number;
  displayName: string;
}

const geocodingCancelTokenSource = axios.CancelToken.source();

export async function fetchAddresses(id: string): Promise<Location> {
  const response = await geocodingProvider.get<LocationApiResponse>('', {
    params: {
      place_id: id,
      key: import.meta.env.VITE_GEOCODING_API_KEY
    },
    cancelToken: geocodingCancelTokenSource.token
  });
  const {
    place_id: placeId,
    geometry,
    formatted_address: displayName
  } = response.data.results[0];
  const location: Location = {
    placeId,
    lat: geometry.location.lat,
    lng: geometry.location.lng,
    displayName
  };
  return location;
}

export function cancelGeocodeRequest(): void {
  geocodingCancelTokenSource.cancel();
}