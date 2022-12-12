import { Maybe } from "../types/generic.types";
import { GeofencePoint } from "../types/geofence.types";
import { GeoLocation } from "../types/location.types";

export function isPointInGeofence(location: GeoLocation, geopoints: GeofencePoint[]): boolean {
  // TODO: Implement detecting if the user is in geofence
  if (geopoints.length < 3) return false;

  var a = false;
  var counter = 0;

  var j = geopoints.length - 1;
  for (var i = 0; i < geopoints.length; i++) {
    // console.log(geopoints[i], ((geopoints[i].lng > location.lng) != (geopoints[j].lng > location.lng)), (location.lat < (geopoints[j].lat - geopoints[i].lat) * (location.lng - geopoints[i].lng) / (geopoints[j].lng - geopoints[i].lng) + geopoints[i].lat));

    if (
      geopoints[i].lng > location.lng != geopoints[j].lng > location.lng &&
      location.lat <
        ((geopoints[j].lat - geopoints[i].lat) * (location.lng - geopoints[i].lng)) /
          (geopoints[j].lng - geopoints[i].lng) +
          geopoints[i].lat
    ) {
      a = !a;
      counter = counter + 1;
    }
    j = i;
  }
  //console.log(location, geopoints);
  // console.log(a, counter);
  // console.log("RESS->");
  return a;
}

export function calculateIntersection(
  p1: GeoLocation,
  p2: GeoLocation,
  p3: GeoLocation,
  p4: GeoLocation,
): Maybe<GeoLocation> {
  // console.log("p1, p2, p3, p4:", p1, p2, p3, p4);

  var c2x = p3.lng - p4.lng; // (x3 - x4)
  var c3x = p1.lng - p2.lng; // (x1 - x2)
  var c2y = p3.lat - p4.lat; // (y3 - y4)
  var c3y = p1.lat - p2.lat; // (y1 - y2)

  // down part of intersection point formula
  var d = c3x * c2y - c3y * c2x;

  if (d == 0) {
    return undefined;
  }

  // upper part of intersection point formula
  var u1 = p1.lng * p2.lat - p1.lat * p2.lng; // (x1 * y2 - y1 * x2)
  var u4 = p3.lng * p4.lat - p3.lat * p4.lng; // (x3 * y4 - y3 * x4)

  // intersection point formula

  var px = (u1 * c2x - c3x * u4) / d;
  var py = (u1 * c2y - c3y * u4) / d;

  var p: GeoLocation = { lat: py, lng: px };

  return p;
}

export function isPointBetweenTwoPoints(point: GeoLocation, p1: GeoLocation, p2: GeoLocation) {
  return (
    ((point.lat >= p1.lat && point.lat <= p2.lat) ||
      (point.lat <= p1.lat && point.lat >= p2.lat)) &&
    ((point.lng >= p1.lng && point.lng <= p2.lng) || (point.lng <= p1.lng && point.lng >= p2.lng))
  );
}

// Go through all lines in the geofence and if the user's path intersects with one of them, return that intersection point
function findUserPathAndGeofenceIntersection(
  p1: GeoLocation,
  p2: GeoLocation,
  geofence: GeofencePoint[],
): Maybe<GeoLocation> {
  for (let i1 = 0; i1 < geofence.length; i1++) {
    const i2 = i1 + (1 % (geofence.length - 1));
    const gp1 = geofence[i1];
    const gp2 = geofence[i2];
    const itrsCandidate = calculateIntersection(p1, p2, gp1, gp2);

    // Only count the intersection points, which fall in between p1 and p2
    if (itrsCandidate && isPointBetweenTwoPoints(itrsCandidate, p1, p2)) return itrsCandidate;
  }

  return undefined;
}

// Find the geofence entry point, assuming that p2 is inside the geofence and p1 is not. In other words the user has just entered the geofence.
export function findEntryPointGeofence(
  userPath: GeoLocation[],
  geopoints: GeofencePoint[],
): Maybe<GeoLocation> {
  if (geopoints.length < 3 || userPath.length < 2) return undefined;

  // p1 and p2 are the latest points in the user's path.
  const p1 = userPath[0];
  const p2 = userPath[1];

  const intersection = findUserPathAndGeofenceIntersection(p1, p2, geopoints);

  return intersection;
}

export function findExitPointGeofence(
  userPath: GeoLocation[],
  geopoints: GeofencePoint[],
): Maybe<GeoLocation> {
  if (geopoints.length < 3 || userPath.length < 2) return undefined;

  // p1 and p2 are the latest points in the user's path.
  const p1 = userPath[0];
  const p2 = userPath[1];

  const intersection = findUserPathAndGeofenceIntersection(p1, p2, geopoints);

  return intersection;
}
