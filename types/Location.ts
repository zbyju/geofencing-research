export interface GeoLocation {
  lat: number;
  lng: number;
}

export interface GeoLocation3D extends GeoLocation {
  altitude: number | null;
}

export interface GeoLocationMeasured extends GeoLocation {
  accuracy: number | null;
}

export interface GeoLocationMeasured3D
  extends GeoLocation3D,
    GeoLocationMeasured {
  accuracyAltitude: number | null;
}
