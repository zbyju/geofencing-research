import { Maybe } from "./generic.types";
import { GeoLocation } from "./location.types";

// Representing geofence
export interface Geofence {
  points: GeofencePoint[];
  active: boolean; // Is the user currently in the geofence
  entryPoint: Maybe<GeoLocation>;
  exitPoint: Maybe<GeoLocation>;
}

// Representing the polygon for the purposes of the google map
export interface GeofencePolygon extends Geofence {
  polygon: any;
}

// Representing one of the points of a geofence
export interface GeofencePoint extends GeoLocation {
  id: string;
  hovered?: boolean;
}
