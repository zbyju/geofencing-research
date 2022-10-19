import type { Maybe } from "./generic";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoLocation3D extends GeoLocation {
  alt: Maybe<number>;
}

export interface GeoLocationMeasured extends GeoLocation {
  accuracy: Maybe<number>;
}

export interface GeoLocationMeasured3D
  extends GeoLocation3D,
    GeoLocationMeasured {
  accuracyAlt: Maybe<number>;
}

export interface LocationPin {
  lat: number;
  lng: number;
  color: string;
  accuracy?: Maybe<number>;
}

export interface MapMarker {
  pin: LocationPin;
  accuracyCircle?: any;
}
