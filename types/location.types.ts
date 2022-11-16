import type { Maybe } from "./generic.types";

// 2D basic location
export interface GeoLocation {
  lat: number;
  lng: number;
}

// 3D location
export interface GeoLocation3D extends GeoLocation {
  alt: Maybe<number>;
}

// Manual location - it might not be defined
export interface ManualGeoLocation {
  lat: Maybe<string | number>;
  lng: Maybe<string | number>;
}

// Manual location 3D
export interface ManualGeoLocation3D extends ManualGeoLocation {
  alt: Maybe<string | number>;
}

// Measured (from api) geolocation might have accuracy
export interface GeoLocationMeasured extends GeoLocation {
  accuracy: Maybe<number>;
}

// Measured 3D have a separate accuracy for altitude
export interface GeoLocationMeasured3D extends GeoLocation3D, GeoLocationMeasured {
  accuracyAlt: Maybe<number>;
}

// Location pin on google map
export interface LocationPin {
  lat: number;
  lng: number;
  color: string;
  accuracy?: Maybe<number>;
}

// Map marker for the purposes of google maps pin + google map circle
export interface MapMarker {
  pin: LocationPin;
  accuracyCircle?: any;
}
