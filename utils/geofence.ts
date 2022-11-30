import { Maybe } from "../types/generic.types";
import { GeofencePoint } from "../types/geofence.types";
import { GeoLocation } from "../types/location.types";

export function isUserInGeofence(location: GeoLocation, geopoints: GeofencePoint[]): boolean {
  // TODO: Implement detecting if the user is in geofence
  if (geopoints.length < 3) return false;


  var a = false;
  var counter = 0;

  var j = geopoints.length-1;
  for(var i = 0 ; i<geopoints.length; i++){
    



    console.log(geopoints[i],((geopoints[i].lng > location.lng)!= (geopoints[j].lng > location.lng)),(location.lat < (geopoints[j].lat -  geopoints[i].lat) * ( location.lng -geopoints[i].lng) / (geopoints[j].lng - geopoints[i].lng) + geopoints[i].lat ));
    
    
    
    if ( ((geopoints[i].lng > location.lng)!= (geopoints[j].lng > location.lng)) && 
    (location.lat < (geopoints[j].lat -  geopoints[i].lat) * ( location.lng -geopoints[i].lng) / (geopoints[j].lng - geopoints[i].lng) + geopoints[i].lat )  ){
      
      


      a = !a;
    counter = counter +1;
    }
    j = i;
  }
  //console.log(location, geopoints);
  console.log(a,counter);
  console.log("RESS->");
  return a;
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
