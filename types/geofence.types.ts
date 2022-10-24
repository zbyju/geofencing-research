export interface Geofence {
  points: GeofencePoint[];
  active: boolean;
}

export type GeofencePoint = number;
