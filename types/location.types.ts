import type { Maybe } from "./generic.types";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoLocation3D extends GeoLocation {
  alt: Maybe<number>;
}

export interface ManualGeoLocation {
  lat: Maybe<string | number>;
  lng: Maybe<string | number>;
}

export interface ManualGeoLocation3D extends ManualGeoLocation {
  alt: Maybe<string | number>;
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
