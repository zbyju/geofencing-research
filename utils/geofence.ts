import { Maybe } from "../types/generic.types";
import { GeofencePoint } from "../types/geofence.types";
import { GeoLocation } from "../types/location.types";

export function isUserInGeofence(location: GeoLocation, geopoints: GeofencePoint[]): boolean {
  // TODO: Implement detecting if the user is in geofence
  if (geopoints.length < 3) return false;

  console.log(location, geopoints);
  return false;
}

export function findEntryPointGeofence(
  userPath: GeoLocation[],
  geopoints: GeofencePoint[],
): Maybe<GeoLocation> {
  // TODO: Implement finding the (first) entry point of user entering the geofence
  if (geopoints.length < 3 || userPath.length === 0) return undefined;

  console.log(userPath, geopoints);
  return userPath[0];
}

export function findExitPointGeofence(
  userPath: GeoLocation[],
  geopoints: GeofencePoint[],
): Maybe<GeoLocation> {
  // TODO: Implement finding the (first) exit point of user exiting the geofence
  if (geopoints.length < 3 || userPath.length === 0) return undefined;

  console.log(userPath, geopoints);
  return userPath[0];
}
