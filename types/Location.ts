import { Maybe } from "./generic";

export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoLocation3D extends GeoLocation {
  alt: number | null;
}

export interface GeoLocationMeasured extends GeoLocation {
  accuracy: number | null;
}

export interface GeoLocationMeasured3D
  extends GeoLocation3D,
    GeoLocationMeasured {
  accuracyAlt: number | null;
}

export interface LocationPin {
  lat: number;
  lng: number;
  color: string;
  accuracy: Maybe<number>;
}
