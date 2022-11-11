import { GeoLocation } from "./location.types";

export interface Geofence {
  points: GeofencePoint[];
  active: boolean;
}

export interface GeofencePolygon extends Geofence {
  polygon: any;
}

export interface GeofencePoint extends GeoLocation {
  id: string;
  hovered?: boolean;
}
